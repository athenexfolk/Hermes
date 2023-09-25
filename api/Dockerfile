FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./package.json
RUN npm install

ENV NODE_ENV=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
