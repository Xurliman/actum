-- +goose Up
CREATE TABLE categories (
    id         UUID PRIMARY KEY DEFAULT uuidv7(),
    user_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    key        TEXT NOT NULL DEFAULT '',
    name       TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX categories_user_id_lower_name_key ON categories (user_id, lower(name));

-- +goose Down
DROP TABLE categories;
