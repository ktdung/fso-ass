const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user.model');
const Blog = require('../models/blog.model');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknow endpoint',
  });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message,
    });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: error.message,
    });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

// const userExtractor = async (req, res, next) => {
//   const decodedToken = jwt.verify(
//     // getTokenFrom(req),
//     req.token,
//     process.env.SECRET
//   );
//   console.log('::1decodedToken: ', decodedToken);

//   if (!decodedToken.id) {
//     return response.status(401).json({
//       error: 'token invalid or missing ',
//     });
//   }

//   console.log('bon:');
//   const user = await User.findById(decodedToken.id);
//   console.log('::userExtracker: ', user);
//   req.user = user;

//   // console.log('::middleware blog', user);

//   next();
// };

module.exports = {
  // userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
