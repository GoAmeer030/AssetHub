# Node.js LTS base image
FROM node:lts-alpine

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

# Build the Next.js app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script
CMD ["npm", "start"]