
FROM node:lts-alpine AS base
# Use an official Node.js LTS (Long Term Support) image as the base for building
FROM base AS builder

# May need this lib as alpine doesn't have it by default
RUN apk add --no-cache libc6-compat
RUN apk update

# Set the working directory inside the container
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Prune lock file
RUN npx turbo prune --scope=currency-dash --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Install dependencies
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=currency-dash...

# Run the project
FROM nginx:1.21.0-alpine AS runner
ENV NODE_ENV production
WORKDIR /usr/share/nginx/html

# Add prod files
COPY --from=installer /app/apps/currency-dash/dist .

# Add nginx.conf
COPY --from=installer /app/apps/currency-dash/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]