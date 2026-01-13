FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire Nuxt app
COPY . .

# Build Nuxt (optional - better for production)
# RUN npm run build

EXPOSE 3000

# Command is in docker-compose
# CMD ["npm", "run", "dev"]