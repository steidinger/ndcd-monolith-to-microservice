FROM node:lts
EXPOSE 8080
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build
USER node
CMD ["node", "./www/server.js"]

