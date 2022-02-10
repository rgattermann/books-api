FROM node:12-alpine

WORKDIR /usr/app

RUN addgroup app && adduser -S -G app app

RUN chown app:app /usr/app

COPY . .

RUN yarn install --ignore-platform --production

RUN yarn build

EXPOSE 3333

CMD [ "node", "dist/server.js" ]
