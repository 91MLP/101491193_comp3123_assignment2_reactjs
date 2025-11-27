# Use Node.js 14 as base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
