# Stage 1
FROM node:18-alpine as node

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/app-ng /usr/share/nginx/html
