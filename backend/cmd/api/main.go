package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Xurliman/actum/backend/internal/config"
	"github.com/Xurliman/actum/backend/internal/logging"
	"github.com/Xurliman/actum/backend/internal/server"
)

const shutdownTimeout = 10 * time.Second

func main() {
	if err := run(); err != nil {
		slog.Error("api: stopped", "error", err)
		os.Exit(1)
	}
}

func run() error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}

	slog.SetDefault(logging.New(cfg.LogFormat, cfg.LogLevel))

	ctx, restoreDefaultSignals := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer restoreDefaultSignals()

	srv := server.NewHTTPServer(cfg.HTTPAddr, server.NewRouter())

	serveErr := make(chan error, 1)
	go func() {
		slog.Info("api: listening", "addr", cfg.HTTPAddr)
		serveErr <- srv.ListenAndServe()
	}()

	select {
	case err := <-serveErr:
		return fmt.Errorf("api: serve http: %w", err)
	case <-ctx.Done():
	}
	restoreDefaultSignals() // a second Ctrl-C now kills the process right away

	slog.Info("api: shutting down", "timeout", shutdownTimeout.String())
	shutdownCtx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		return fmt.Errorf("api: shut down: %w", err)
	}
	if err := <-serveErr; !errors.Is(err, http.ErrServerClosed) {
		return fmt.Errorf("api: serve http: %w", err)
	}
	slog.Info("api: stopped")
	return nil
}
