FROM node:12 as build

WORKDIR /app

# Copy package*.json files to correct locations
COPY /package*.json ./
COPY /client/package*.json ./client/

# Install all dependencies needed for building
RUN npm run ci:all

COPY . .

RUN npm run build:all

# Remove dependencies not needed to run the app
ENV NODE_ENV=production
RUN npm run prune:all

FROM node:12-alpine

WORKDIR /app

COPY --from=build /app .

ENV NODE_ENV=production
ENV PORT 80
EXPOSE 80

CMD [ "npm", "run", "start:prod" ]
