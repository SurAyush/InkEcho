# setting up image
FROM node:18-alpine as development

# setting up work directory
WORKDIR /app

# copying package.json and package-lock.json
COPY package*.json ./

# installing dependencies (clean install)
RUN npm ci

# copying the rest of the files
COPY . .

# building the app with VITE_API_URL as an argument
ARG VITE_API_URL                                   
RUN VITE_API_URL=${VITE_API_URL} npm run build          