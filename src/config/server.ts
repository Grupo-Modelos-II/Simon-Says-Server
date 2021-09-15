import express, { Express } from 'express';
import morgan from 'morgan';

import player from '../controller/player';

const app: Express = express();

//Middlewares config
app.use(morgan('dev'));
app.use(express.json());

//Router confug
app.use('/player',player);

export default app;