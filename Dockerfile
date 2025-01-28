# Dockerfile
# -------------------------------------------------
# Multi-stage Docker build for Next.js

# --- Stage 1: Builder ---
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build Next.js (production build)
RUN npm run build

# --- Stage 2: Production Runner ---
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy only what's necessary
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/next.config.js .
COPY --from=builder /usr/src/app/tailwind.config.js .
COPY --from=builder /usr/src/app/postcss.config.js .
COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]