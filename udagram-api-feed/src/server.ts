import 'dotenv/config'
import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS} from './controllers/v0/model.index';


(async (): Promise<void> => {
  console.log(`Connecting to database ${config.host} / ${config.database}`);
  await sequelize.addModels(V0_FEED_MODELS);
  console.log('Syncing db');
  await sequelize.sync();
  console.log('Starting server');
  const app = express();

  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: config.url,
  }));

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  app.listen( config.port, () => {
    console.log( `server listening on port ${config.port}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
