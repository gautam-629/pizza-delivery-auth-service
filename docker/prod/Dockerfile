# Stage 1: Build Stage
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies defined in package-lock.json (for reproducible builds)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine as production

# Set the environment variable to production
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies, ignoring dev dependencies
RUN npm ci --ignore-scripts

# Copy the built application files from the previous stage to the working directory
COPY --from=builder /app/dist ./

# Expose port 5500
EXPOSE 5500

# Command to run the server
CMD ["node", "src/server.js"]
