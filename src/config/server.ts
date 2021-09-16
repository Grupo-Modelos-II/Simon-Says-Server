import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import playerController from '../controller/PlayerController';

const app: Express = express();

//Middlewares config
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Router confug
app.use('/player',playerController);

export default app;