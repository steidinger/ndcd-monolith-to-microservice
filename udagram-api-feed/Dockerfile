FROM node:lts
EXPOSE 8080
WORKDIR /usr/src/app
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_PASSWORD=...
ENV POSTGRES_DB=udagramdev
ENV POSTGRES_HOST=udagramdev.cn7ezlx8ayze.eu-central-1.rds.amazonaws.com
ENV JWT_SECRET=change-me
ENV URL=http://localhost:4200
ENV AWS_REGION=eu-central-1
ENV AWS_PROFILE=default
ENV AWS_BUCKET=udagram-269004290177-dev

COPY . .
RUN npm install
RUN npm run build
USER node
CMD ["node", "./www/server.js"]

