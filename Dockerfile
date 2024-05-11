# Base
FROM node:latest as base

USER root

RUN apt update -y && apt upgrade -y

# Builder
FROM base AS builder

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Set node env to production
ENV NODE_ENV=production

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Production
FROM base AS prod

WORKDIR /app

# Copy files from previous step to prod
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose por 3001 to TCP connections
EXPOSE 3000

# Use the default user from the image (instead of the root user)
USER 1001

# Download the cert files and start the service
CMD ["npm run start:prod"]
