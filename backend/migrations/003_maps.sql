CREATE TABLE maps (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    slug            VARCHAR(200) UNIQUE NOT NULL,
    style_theme     VARCHAR(50) DEFAULT 'light',
    center_lat      DOUBLE PRECISION CHECK (center_lat BETWEEN -90 AND 90),
    center_lng      DOUBLE PRECISION CHECK (center_lng BETWEEN -180 AND 180),
    zoom_level      SMALLINT DEFAULT 12 CHECK (zoom_level BETWEEN 0 AND 24),
    is_published    BOOLEAN DEFAULT FALSE,
    view_count      BIGINT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_maps_user_id ON maps(user_id);

CREATE TRIGGER maps_updated_at BEFORE UPDATE ON maps
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
