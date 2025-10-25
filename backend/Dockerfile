FROM node:22 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

ADD . /app

RUN npm run prisma:generate

ENV NODE_ENV production

STOPSIGNAL SIGKILL

CMD npm run start
