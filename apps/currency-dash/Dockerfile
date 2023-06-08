
FROM node:lts-alpine AS base
# Use an official Node.js LTS (Long Term Support) image as the base for building
FROM base AS builder

# May need this lib as alpine doesn't have it by default
RUN apk add --no-cache libc6-compat
RUN apk update

# Set the working directory inside the container
WORKDIR /app

# Install turborepo command
RUN npm install -g turbo

# Copy all files to the working directory
COPY . .

# Prune lock file
RUN turbo prune --scope=currency-dash --docker


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
RUN npm run turbo run build -- --filter=currency-dash...

# Run the project
FROM nginx:1.21.0-alpine AS runner
ENV NODE_ENV production
WORKDIR /usr/share/nginx/html

# Add prod files
COPY --from=installer /app/dist .

# Add nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# # Use an official Node.js LTS (Long Term Support) image as the base for building
# FROM node:lts-alpine as builder

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock) to the working directory
# COPY package*.json ./

# # Install dependencies before copying project files to cache this task
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the app for production
# RUN npm run build

# # Bundle static assets with nginx
# FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production

# # Copy built assets from `builder` image
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Add nginx.conf
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]

# # ===============  Host using Serve

# # Install the `serve` package globally
# RUN npm install --global serve

# # Expose the port on which the app will run (if applicable)
# EXPOSE 5173

# # Define the command to run when the container starts
# CMD [ "serve", "dist", "--listen", "5173", "--single" ]