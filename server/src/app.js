import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import { ApiError } from './utils/ApiError.js';  // make sure path is correct

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// mount your routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/property', propertyRouter);

// 404 handler — all other routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// error‐handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    // our custom errors
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // mongoose validation errors, multer errors, etc.
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  // fallback for anything else
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
