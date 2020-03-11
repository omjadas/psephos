FROM node:13-alpine as build

WORKDIR /app

RUN apk --no-cache add --virtual builds-deps build-base python

# Copy package*.json files to correct locations
COPY /package*.json ./
COPY /client/package*.json ./client/

# Install all dependencies needed for building
RUN npm run ci:all
RUN npm rebuild bcrypt --build-from-source

COPY . .

ENV NODE_ENV=production
RUN npm run build:all

# Remove dependencies not needed to run the app
RUN npm prune

FROM node:13-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/client/build ./client/build
COPY --from=build /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT 80
EXPOSE 80

CMD [ "npm", "run", "start:prod" ]
