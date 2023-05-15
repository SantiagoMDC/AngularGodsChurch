# Primera etapa: Compilar la aplicación Angular
FROM node:latest as build-step

WORKDIR /app

COPY package*.json /app/

RUN npm install -g npm@latest

RUN npm install

COPY . /app

RUN npm run build --prod

# Muestra el contenido del directorio de compilación para verificar que los archivos se han generado correctamente
RUN ls -al /app/dist

# Segunda etapa: Copiar los archivos compilados en el contenedor NGINX
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/gods-church /usr/share/nginx/html
