package server

import (
	"crypto/rand"
	"log/slog"
	"net/http"
	"runtime/debug"
	"time"

	"github.com/go-chi/chi/v5/middleware"

	"github.com/Xurliman/actum/backend/internal/apperrors"
	"github.com/Xurliman/actum/backend/internal/logging"
)

const requestIdHeader = "X-Request-Id"

func assignRequestId(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := rand.Text()
		w.Header().Set(requestIdHeader, id)
		next.ServeHTTP(w, r.WithContext(logging.WithRequestId(r.Context(), id)))
	})
}

func logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

		next.ServeHTTP(ww, r)

		status := ww.Status()
		if status == 0 { // handler wrote nothing; net/http sends 200
			status = http.StatusOK
		}
		level := slog.LevelInfo
		if status >= http.StatusInternalServerError {
			level = slog.LevelError
		}
		slog.LogAttrs(r.Context(), level, "server: handle request",
			slog.String("method", r.Method),
			slog.String("path", r.URL.Path),
			slog.Int("status", status),
			slog.Int("bytes", ww.BytesWritten()),
			slog.Float64("duration_ms", float64(time.Since(start).Microseconds())/1000),
		)
	})
}

func recoverPanics(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			rec := recover()
			if rec == nil {
				return
			}
			if rec == http.ErrAbortHandler { // deliberate abort; let net/http handle it
				panic(rec)
			}
			slog.ErrorContext(r.Context(), "server: handle request: panic",
				slog.Any("panic", rec),
				slog.String("stack", string(debug.Stack())),
			)
			WriteError(w, r, http.StatusInternalServerError, apperrors.Internal)
		}()
		next.ServeHTTP(w, r)
	})
}
