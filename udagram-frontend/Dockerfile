FROM node:lts
EXPOSE 8080
WORKDIR /usr/src/app

COPY www/ ./www/
COPY docker-package.json ./package.json
RUN npm install
USER node
CMD ["npm", "start"]

