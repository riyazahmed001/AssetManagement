# Stage 1

FROM node:12-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build 

FROM nginx:1.20.1
COPY --from=build-step /app/dist/AssetManagement /usr/share/nginx/html
EXPOSE 4200:80