default:
    @just --list

# ── Development (hot-reload) ─────────────────────────────────────────────────
# Uses docker-compose.override.yml automatically. The frontend runs `next dev`
# with source bind-mounted, so edits to frontend/src/ reload the browser
# instantly without rebuilding the image.

# Start all services in dev mode (background)
up:
    podman compose up -d

# Start all services in dev mode (foreground, shows all logs)
up-fg:
    podman compose up

# Rebuild images then start in dev mode — run after adding npm dependencies
# or changing the Dockerfile
up-build:
    podman compose up --build -d

# ── Production ───────────────────────────────────────────────────────────────
# Skips the override file, so the frontend runs a full `next build` and serves
# via `node server.js`. Use this to verify the production build locally before
# deploying, or in CI.

# Start all services in production mode (background)
up-prod:
    podman compose -f docker-compose.yml up -d

# Start all services in production mode (foreground)
up-prod-fg:
    podman compose -f docker-compose.yml up

# Rebuild images then start in production mode
up-prod-build:
    podman compose -f docker-compose.yml up --build -d

# ── Shared ───────────────────────────────────────────────────────────────────

# Stop all running services
down:
    podman compose down

# Restart all services (keeps volumes)
restart:
    podman compose restart

# Stream logs from all services
logs:
    podman compose logs -f

# Show running containers and their status
ps:
    podman compose ps

# Open a psql shell against the dev database
psql:
    podman compose exec db psql -U mapdrop -d mapdrop

# Stop all services and delete volumes — wipes the database. Use when you need
# a clean slate (e.g. after a breaking migration change)
nuke:
    podman compose down -v
