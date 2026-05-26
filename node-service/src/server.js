const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const client = require('prom-client');
require('dotenv').config();

const app = express();
const PORT = process.env.NODE_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:adminpassword@mongodb:27017/devopsdb?authSource=admin';

// Prometheus Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Custom metrics to track API request count and latency
const httpRequestCounter = new client.Counter({
  name: 'node_service_http_requests_total',
  help: 'Total number of HTTP requests made to Node Service',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new client.Histogram({
  name: 'node_service_http_request_duration_seconds',
  help: 'Duration of HTTP requests to Node Service in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5]
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // Structured server request logging

// Middleware to capture Prometheus metrics
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;
    
    // Do not log metric-scraping or health queries in our metric aggregates if we want to keep them clean
    if (req.route && req.route.path) {
      httpRequestCounter.labels(req.method, req.route.path, res.statusCode).inc();
      httpRequestDuration.labels(req.method, req.route.path, res.statusCode).observe(durationInSeconds);
    }
  });
  next();
});

// MongoDB Connection with Graceful Retries
let isDbConnected = false;

const connectDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Try for 5 seconds
    });
    isDbConnected = true;
    console.log('Successfully connected to MongoDB!');
  } catch (err) {
    isDbConnected = false;
    console.error('Failed to connect to MongoDB on startup. Retrying in 10 seconds...', err.message);
    setTimeout(connectDb, 10000); // Retry connection after 10s
  }
};

// Initial connection trigger (only if not in Jest test environment)
if (process.env.NODE_ENV !== 'test') {
  connectDb();
}

// REST Endpoints

// 1. Health check endpoint (satisfying specific requirements)
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'node-service',
    status: 'UP',
    database: isDbConnected ? 'CONNECTED' : 'DISCONNECTED',
    timestamp: new Date().toISOString()
  });
});

// 2. Metrics endpoint for Prometheus scrape
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// 3. A test database query endpoint
app.get('/data', async (req, res) => {
  if (!isDbConnected) {
    return res.status(503).json({ error: 'Database service is currently unavailable.' });
  }
  try {
    // Basic dynamic data collection to show database interaction
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    res.status(200).json({
      message: 'Node API successfully fetched database metadata!',
      collectionsCount: collections.length,
      collections: collections.map(col => col.name)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch database information.', details: err.message });
  }
});

// Server Bootstrap
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node Express Service is running on http://0.0.0.0:${PORT}`);
  });
}

// Export for test suites
module.exports = { app, server };
