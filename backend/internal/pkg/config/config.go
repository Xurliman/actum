package config

import (
	"fmt"
	"log/slog"
	"os"
)

type Config struct {
	HTTPAddr  string
	LogLevel  slog.Level
	LogFormat string
}

func Load() (Config, error) {
	cfg := Config{
		HTTPAddr:  getenv("HTTP_ADDR", ":8080"),
		LogFormat: getenv("LOG_FORMAT", "json"),
	}
	if err := cfg.LogLevel.UnmarshalText([]byte(getenv("LOG_LEVEL", "info"))); err != nil {
		return Config{}, fmt.Errorf("config: parse LOG_LEVEL: %w", err)
	}
	if cfg.LogFormat != "text" && cfg.LogFormat != "json" {
		return Config{}, fmt.Errorf("config: parse LOG_FORMAT: %q is not text or json", cfg.LogFormat)
	}
	return cfg, nil
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
