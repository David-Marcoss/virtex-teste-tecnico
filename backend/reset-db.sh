#!/bin/sh

docker compose run -it --rm backend ./node_modules/.bin/prisma migrate reset --force
docker compose run -it --rm backend npm run -- seed
