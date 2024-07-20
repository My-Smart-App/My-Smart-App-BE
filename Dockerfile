# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./

# Install the NestJS CLI globally
RUN yarn global add @nestjs/cli 

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application
CMD ["node", "dist/main"]
