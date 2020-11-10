#!/usr/bin/env sh

while [ ! -f /app/schema.gql ]; do sleep 1; done

npm run watch
