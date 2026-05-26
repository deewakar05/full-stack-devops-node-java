# ==========================================
# Stage 1: Compile Production Assets
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency mappings
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy remaining source code
COPY . .

# Compile optimized static bundles to dist/
RUN npm run build

# ==========================================
# Stage 2: Optimized Nginx Runtime
# ==========================================
FROM nginx:1.25-alpine

# Copy compiled assets from build stage to Nginx public root
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default Nginx configuration with our SPA optimized config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose internal port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
