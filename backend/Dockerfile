# Use Node.js 20
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 3000

# Start application
CMD ["npm", "start"]