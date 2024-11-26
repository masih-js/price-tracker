# Use the Node.js v20.18.0 base image
FROM node:20.18.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8001

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
