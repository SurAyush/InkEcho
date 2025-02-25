# setting up image
FROM node:18-alpine AS development

# setting up work directory
WORKDIR /app

# copying package.json and package-lock.json
COPY package*.json ./

# installing dependencies (clean install)
RUN npm ci

# copying the rest of the files
COPY . .

# building the app with VITE_API_URL as an argument
# ARG VITE_API_SERVER_URL, VITE_API_ASSETS_URL                                   
# RUN VITE_API_SERVER_URL=${VITE_API_URL} VITE_API_SERVER_URL=${VITE_API_ASSETS_URL} npm run build  
ARG VITE_API_SERVER_URL
ARG VITE_API_ASSETS_URL
ENV VITE_API_SERVER_URL=${VITE_API_SERVER_URL}
ENV VITE_API_ASSETS_URL=${VITE_API_ASSETS_URL}
RUN npm run build        


# FOR PRODUCTION
FROM caddy:2-alpine AS production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=development /app/dist /srv