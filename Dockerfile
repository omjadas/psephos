FROM node:12 as build

WORKDIR /app

# Copy package*.json files to correct locations
COPY /package*.json ./
COPY /client/package*.json ./client/

# Install all dependencies needed for building
RUN npm run ci:all

COPY . .

ENV NODE_ENV=production
RUN npm run build:all

# Remove dependencies not needed to run the app
RUN npm run prune:all

FROM node:12-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/client/package*.json ./client/
COPY --from=build /app/dist ./dist
COPY --from=build /app/client/build ./client/build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/client/node_modules ./client/node_modules

ENV NODE_ENV=production
ENV PORT 80
EXPOSE 80

CMD [ "npm", "run", "start:prod" ]
