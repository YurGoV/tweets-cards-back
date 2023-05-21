require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');

const { DEV_ENV } = process.env;

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status } = err;

  if (DEV_ENV === 'development') {
    res.status(status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(status || 500).json({
      message: err.message,
    });
  }
});

module.exports = app;
