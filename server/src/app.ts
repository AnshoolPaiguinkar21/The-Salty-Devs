import express from 'express';
import routes from '@routes/index.ts';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@middlewares/errHandler.middleware.ts';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { limiter } from '@middlewares/rateLimit.middleware.ts';
//import { errorHandler } from "@middlewares/errHandler.middleware.ts"

const app = express();

// Security and logging middlewares
app.use(helmet()); // For security headers
app.use(morgan('dev')); // For request logging and development

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter)
app.use(routes);
app.use(errorHandler);

export default app;

