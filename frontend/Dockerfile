# Use the official Node.js 14 image as the base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# # Build the project
# RUN npm run build

EXPOSE 3000

# Set the command to run when the container starts
CMD [ "npm", "start" ]
