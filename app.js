const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a6ec3931470af9fd98bed4',
  };

  next();
});

app.use(router);

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
