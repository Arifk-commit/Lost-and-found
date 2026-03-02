import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import logger from './config/logger.js';
import { validateEnv } from './config/env.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { securityHeaders, apiLimiter, sanitizeInput } from './middlewares/security.js';
import userRoutes from './routes/userRoutes.js';
import ItemRoutes from './routes/ItemRoutes.js';

// Load environment variables
dotenv.config();

// Validate environment variables
const env = validateEnv();

const app = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(securityHeaders);
app.use(sanitizeInput);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'token',
  ],
  maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  logger.info({
    req,
    message: `${req.method} ${req.url}`,
  });
  next();
});

// Health check endpoint (no rate limiting)
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// API routes with rate limiting
app.use('/users', apiLimiter, userRoutes);
app.use('/Items', apiLimiter, ItemRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const port = parseInt(env.PORT, 10);
const db = env.DB;

// MongoDB Connection with better error handling
mongoose
  .connect(db, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    logger.info('✅ Database connected successfully');
    app.listen(port, () => {
      logger.info(`✅ Server running on PORT: ${port}`);
      logger.info(`✅ Environment: ${env.NODE_ENV}`);
      logger.info(`✅ Client URL: ${env.CLIENT_URL}`);
    });
  })
  .catch((err) => {
    logger.error({ err }, '❌ Database connection failed');
    process.exit(1);
  });

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  logger.error({ err }, '❌ MongoDB connection error');
});

mongoose.connection.on('disconnected', () => {
  logger.warn('⚠️  MongoDB disconnected');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, '❌ Unhandled Promise Rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error({ err }, '❌ Uncaught Exception');
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received, shutting down gracefully');
  mongoose.connection.close(false, () => {
    logger.info('✅ MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('👋 SIGINT received, shutting down gracefully');
  mongoose.connection.close(false, () => {
    logger.info('✅ MongoDB connection closed');
    process.exit(0);
  });
});

export default app;


