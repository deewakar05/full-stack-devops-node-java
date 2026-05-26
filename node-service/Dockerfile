# Use a lightweight official Node Alpine image
FROM node:18-alpine

# Set non-interactive production environment
ENV NODE_ENV=production

# Set up working directory inside the container
WORKDIR /app

# Copy dependency configs
COPY package*.json ./

# Install production-only dependencies
RUN npm ci --only=production

# Copy remaining source code (using .dockerignore or selective copying)
COPY src/ ./src/

# Expose service port
EXPOSE 3000

# Set user context to standard non-root node user for container hardening
USER node

# Start the application
CMD ["npm", "start"]
