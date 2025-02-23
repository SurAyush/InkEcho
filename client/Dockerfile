# setting up image
FROM node:18-alpine

# setting up work directory
WORKDIR /app

# copying package.json and package-lock.json
COPY package*.json ./

# installing dependencies (clean install)
RUN npm ci

# copying the rest of the files
COPY . .