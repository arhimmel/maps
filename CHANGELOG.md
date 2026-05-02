# Changelog

All notable changes to MapDrop will be documented in this file.

## [Unreleased] - 2026-05-02

### Added — UI Prototype & Frontend Screens
- Standalone interactive prototype at `MapDrop.html` (root) — iPhone-framed, 4 screens (onboarding/map/detail/editor), MapLibre tiles, light/dark + pin-style tweaks. Backed by `app.jsx`, `screens.jsx`, `map-bits.jsx`, `data.js`, `style.css`.
- Ported prototype into Next.js routes under `frontend/src/app/`:
  - `/login` — onboarding with email + Apple/Google buttons (stubbed; sets demo access token).
  - `/maps/[slug]` — map view with MapLibre, category pills, pin selection card, peek/half bottom sheet.
  - `/maps/[slug]/pins/[id]` — full location detail (server component).
  - `/maps/[slug]/edit` — new-drop editor with live map crosshair pin and category picker.
- Shared frontend components: `components/use-map-libre.ts` (warm CARTO Voyager raster style + dark variant), `components/pin-layer.tsx` (emoji/numbered/dot pins with selection pulse), `components/icon.tsx` (stroke icon set).
- Data layer: `lib/types.ts`, `lib/demo-data.ts` (Best Ramen in NYC fixture), `lib/use-map.ts` (hook with `USE_LIVE_API` flag for swapping to `apiFetch('/maps/:slug')` once backend ships).
- Updated `globals.css` with full dark-mode palette, pin/sheet animations, and MapLibre attribution overrides.
- Added `maplibre-gl/dist/maplibre-gl.css` import to root `layout.tsx`.

### Decisions
- **Standalone HTML prototype kept alongside Next.js** — `MapDrop.html` is a high-fidelity reference for design review; `frontend/` is the production wiring. Both share the DESIGN.md token system 1:1.
- **Demo data over live API for v1 prototype** — swapping in real fetches is a single boolean flip in `use-map.ts`. Avoids blocking design work on backend endpoints.
- **MapLibre raster style with desaturation + warm bg layer** — matches DESIGN.md "organic editorial" tone without a custom vector style.

## [0.1.0.0] - 2026-03-24

### Added
- Docker Compose setup with PostgreSQL 16 + PostGIS 3.4
- Rust/Axum API skeleton with health check, CORS, structured logging (tracing), and OpenAPI/Swagger UI
- AppError enum with 8 error variants and safe JSON error responses (internal errors never leak details)
- Database migrations: users (CITEXT email/username), maps (with CHECK constraints on lat/lng/zoom), categories (per-map unique), locations (PostGIS GEOGRAPHY), refresh_tokens (unique hash)
- `updated_at` triggers on users, maps, and locations tables
- Next.js App Router skeleton with Fraunces + DM Sans fonts and full DESIGN.md token system in CSS custom properties
- API fetch wrapper with Bearer auth, silent token refresh, 204 handling, and FormData support
- Vitest test suite for frontend API client (10 tests)
- PWA manifest with MapDrop branding
- OpenAPI pipeline: utoipa spec generation + openapi-typescript codegen script
