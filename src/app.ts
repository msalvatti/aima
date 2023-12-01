import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { authMiddleware } from './middlewares/authMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';

import productsRouter from './routers/productRouter';

import { authenticate } from './controllers/authController';

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.post('/sign-in', authenticate);

app.use('/products', authMiddleware, productsRouter);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export = app;
