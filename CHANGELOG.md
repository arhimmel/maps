# Changelog

All notable changes to MapDrop will be documented in this file.

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
