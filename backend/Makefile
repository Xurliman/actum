DATABASE_URL ?= postgres://actum:actum@localhost:5432/actum?sslmode=disable
GOOSE = go run github.com/pressly/goose/v3/cmd/goose@v3.29.0
goose_for = $(GOOSE) -dir internal/$(1)/migrations -table goose_$(1)_version postgres "$(DATABASE_URL)"

.PHONY: run migrate-up migrate-down

run:
	LOG_FORMAT=text go run ./cmd/api

migrate-up:
	$(call goose_for,auth) up
	$(call goose_for,ledger) up

migrate-down:
	@test -n "$(MODULE)" || (echo "usage: make migrate-down MODULE=auth|ledger" && exit 1)
	$(call goose_for,$(MODULE)) down
