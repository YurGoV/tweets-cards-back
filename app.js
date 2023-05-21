require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swaggerApi.json');

const customErrorMessage = require('./utils/customErrorsMessages');

const usersRouter = require('./routes/usersRouter')

const { DEV_ENV } = process.env;

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

const corsOptions = {
  origin: ['http://localhost:3000', 'https://tweets.yurgo.fun', 'https://yurgov.github.io'],
  methods: ['GET,POST,PUT,DELETE,OPTIONS'],
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://tweets.yurgo.fun');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', usersRouter);

app.get('/api', (req, res) => {
  res.send(
    'Hello World! This is the first response from TWEETS backend :-)'
  );
});

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

/**
 * * Global error handler (middleware)
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status } = err; // there we get error status

  if (DEV_ENV === 'development') {
    const { status: customStatus, message } = customErrorMessage(err.message);
    res.status(customStatus || 500).json({
      message,
      stack: err.stack,
    });
  } else {
    res.status(status || 500).json({
      message: err.message,
    });
  }
});

module.exports = app;
