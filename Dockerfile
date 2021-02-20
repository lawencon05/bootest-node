FROM node:15.9.0-alpine3.13

WORKDIR /apps

COPY package.json .

RUN npm install --quiet

COPY . .

