import express, { Express } from 'express';
import morgan from 'morgan';

import playerController from '../controller/PlayerController';

const app: Express = express();

//Middlewares config
app.use(morgan('dev'));
app.use(express.json());

//Router confug
app.use('/player',playerController);

export default app;