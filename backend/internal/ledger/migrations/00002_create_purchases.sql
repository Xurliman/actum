-- +goose Up
CREATE TABLE purchases (
    id           UUID PRIMARY KEY DEFAULT uuidv7(),
    user_id      UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    merchant     TEXT NOT NULL DEFAULT '',
    currency     TEXT NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
    source       TEXT NOT NULL CHECK (source IN ('manual', 'receipt')),
    note         TEXT NOT NULL DEFAULT '',
    purchased_at TIMESTAMPTZ NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX purchases_user_id_purchased_at_idx ON purchases (user_id, purchased_at);

-- +goose Down
DROP TABLE purchases;
