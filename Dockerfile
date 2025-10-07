FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist/virtubuild-dashboard/browser ./dist

EXPOSE 80

CMD ["http-server", "dist", "-p", "80", "-a", "0.0.0.0"]


