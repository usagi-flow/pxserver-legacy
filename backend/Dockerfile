FROM node:alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
ENTRYPOINT PORT=3000 npm start