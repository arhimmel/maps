CREATE TABLE locations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    map_id          UUID NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
    category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
    name            VARCHAR(200) NOT NULL,
    description     TEXT,
    coordinates     GEOGRAPHY(POINT, 4326) NOT NULL,
    address         TEXT,
    notes           TEXT,
    creator_rating  SMALLINT CHECK (creator_rating BETWEEN 1 AND 5),
    sort_order      SMALLINT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_locations_coordinates ON locations USING GIST(coordinates);
CREATE INDEX idx_locations_map_id ON locations(map_id);
CREATE INDEX idx_locations_category_id ON locations(category_id);

CREATE TRIGGER locations_updated_at BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
