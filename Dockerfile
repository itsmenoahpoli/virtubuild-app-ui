FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

RUN npm install -g http-server

EXPOSE 80

CMD ["http-server", "dist/virtubuild-dashboard/browser", "-p", "80", "-a", "0.0.0.0"]


