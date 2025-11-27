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

# Expose port 3001
EXPOSE 3001

# Start the development server
CMD ["npm", "start"]
