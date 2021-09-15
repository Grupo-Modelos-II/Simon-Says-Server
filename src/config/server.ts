import express, { Express } from 'express';
import morgan from 'morgan';

const app: Express = express();

app.use(morgan('dev'));

import player from '../controller/player';

app.use(player);

export default app;