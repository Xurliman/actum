-- +goose Up
CREATE TABLE users (
    id         UUID PRIMARY KEY DEFAULT uuidv7(),
    email      TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_lower_email_key ON users (lower(email));

-- +goose Down
DROP TABLE users;
