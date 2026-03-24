CREATE TABLE categories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    map_id          UUID NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    emoji           VARCHAR(10) NOT NULL,
    sort_order      SMALLINT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(map_id, name)
);

CREATE INDEX idx_categories_map_id ON categories(map_id);
