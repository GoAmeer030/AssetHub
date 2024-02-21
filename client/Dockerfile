# Node.js LTS base image
FROM node:lts-alpine as test-target

# ARGS
ARG NEXT_PUBLIC_SERVER_URL

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build
FROM test-target as build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN npm run build

# Reduce installed packages to production-only.
RUN npm prune --production

# Archive
FROM node:lts-alpine as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/app/node_modules/.bin

WORKDIR /app

# Include only the release build and production packages.
COPY --from=build-target /app/node_modules node_modules
COPY --from=build-target /app/.next .next

CMD ["next", "start"]