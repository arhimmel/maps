default:
    @just --list

up:
    podman compose up -d

up-fg:
    podman compose up

down:
    podman compose down

restart:
    podman compose restart

logs:
    podman compose logs -f

ps:
    podman compose ps

psql:
    podman compose exec db psql -U mapdrop -d mapdrop

nuke:
    podman compose down -v
