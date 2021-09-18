import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import playerController from '../controller/PlayerController';
import authController from '../controller/AuthController';

const app: Express = express();

//Middlewares config
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Router confug
app.use('/player',playerController);
app.use('/auth',authController);

export default app;