import 'dotenv/config.js'
import './config/database.js' //requiero la configuracion de la db
import cors from'cors'
import express from'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';
import { __dirname } from './utils.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'
import indexRouter from'./routes/index.js'
import mercadopago from 'mercadopago';

const app = express();

mercadopago.configure({access_token: process.env.MERCADOPAGO_KEY})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',indexRouter)
app.use(notFoundHandler)
app.use(errorHandler)

export default app;
