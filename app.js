const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/handleError');
const { RATE_LIMIT_SETTINGS } = require('./utils/config');
const { CONNECT_DB_MESSAGE, CONNECT_DB_ERROR_MESSAGE, SERVER_IS_RUNNING_MESSAGE } = require('./utils/constants');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

const limiter = rateLimit(RATE_LIMIT_SETTINGS);

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(limiter);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

mongoose.connect(DB_URL)
  .then(() => {
    console.log(CONNECT_DB_MESSAGE);
    app.listen(PORT, () => {
      console.log(`${SERVER_IS_RUNNING_MESSAGE} ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(CONNECT_DB_ERROR_MESSAGE, err);
  });
