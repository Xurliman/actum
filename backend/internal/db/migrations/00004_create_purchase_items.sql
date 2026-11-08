-- +goose Up
CREATE TABLE purchase_items (
    id             UUID PRIMARY KEY DEFAULT uuidv7(),
    purchase_id    UUID NOT NULL REFERENCES purchases (id) ON DELETE CASCADE,
    name           TEXT NOT NULL DEFAULT '',
    quantity_milli BIGINT NOT NULL DEFAULT 1000,
    amount_cents   BIGINT NOT NULL,
    category_id    UUID NOT NULL REFERENCES categories (id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX purchase_items_purchase_id_idx ON purchase_items (purchase_id);
CREATE INDEX purchase_items_category_id_idx ON purchase_items (category_id);

-- +goose Down
DROP TABLE purchase_items;
