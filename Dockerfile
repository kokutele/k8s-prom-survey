FROM node:14.16-alpine3.12 as builder

RUN apk update \
  && apk add --update --no-cache \
  tini

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY app.js /app/app.js
RUN npm install --production

ENTRYPOINT ["/sbin/tini", "node"]
