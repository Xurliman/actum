DATABASE_URL ?= postgres://actum:actum@localhost:5432/actum?sslmode=disable
GOOSE = go run github.com/pressly/goose/v3/cmd/goose@v3.29.0 -dir internal/db/migrations postgres "$(DATABASE_URL)"

.PHONY: run migrate-up migrate-down

run:
	LOG_FORMAT=text go run ./cmd/api

migrate-up:
	$(GOOSE) up

migrate-down:
	$(GOOSE) down
