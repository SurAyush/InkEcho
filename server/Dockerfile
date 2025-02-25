FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Execute  (can be done from docker-compose.yml too)
CMD ["npm", "run", "dev"]

# for production

FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./

# no dev-dependencies
RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "start"]