FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Execute  (can be done from docker-compose.yml too)
CMD ["npm", "run", "dev"]