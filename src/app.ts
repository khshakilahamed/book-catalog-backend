import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

app.use(cors());
app.use(cookieParser());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/', routes);

// global Error Handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
