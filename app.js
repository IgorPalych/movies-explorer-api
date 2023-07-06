const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('Это ответ сервера!');
});

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
