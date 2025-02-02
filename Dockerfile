FROM node:22.13.1 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production
FROM nginx:stable
COPY ./conf-nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./conf-nginx/mime.types /etc/nginx/mime.types
COPY ./conf-nginx/redirect_file.js /etc/nginx/redirect_file.js
COPY --from=build /app/dist/file-manager-front/ /usr/share/nginx/html
EXPOSE 4200