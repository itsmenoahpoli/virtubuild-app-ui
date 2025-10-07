FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

FROM nginx:alpine

COPY --from=builder /app/dist/virtubuild-dashboard/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove any potential npm references and ensure clean nginx startup
RUN rm -rf /tmp/* /var/tmp/*

EXPOSE 80

# Explicit nginx command to prevent Railway from running npm
CMD ["nginx", "-g", "daemon off;"]


