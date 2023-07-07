const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res) => {
  UserModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProfile = (req, res) => {
  const { name, email } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createUser = (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    /* Решить вопрос, в куда пихнуть значение соли - в константы или перем
    енные окружения */
    .then((hash) => UserModel.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ data: token });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  createUser,
  login,
};
