const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blog.controller');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

// database init
mongoose.set('strictQuery', false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB');
  });

// logger
logger.info('connecting to', config.MONGODB_URI);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
// app.use(middleware.requestLogger);

// console.log('hello');

app.get('/info', (req, res) => {
  console.log('1');
  res.send({
    sayHi: 'Hello World',
  });
});

// router
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
