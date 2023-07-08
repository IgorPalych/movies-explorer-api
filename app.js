const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { errors } = require('celebrate');

const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.json());

app.use(helmet());

app.use(limiter);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Подключились к базе данных...');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе: ', err);
  });
