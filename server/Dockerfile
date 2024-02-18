# Node.js LTS base image
FROM node:lts-alpine

# ARGS
ARG DATABASE_URL

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the Prisma schema and the Prisma client configuration
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Client generation
RUN npx prisma generate

# Copy all files
COPY . .

# Expose the listening port
EXPOSE 3001
