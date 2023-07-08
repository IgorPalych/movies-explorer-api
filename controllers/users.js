const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UserExist = require('../errors/UserExist');

const {
  MONGO_DUPLICATE_KEY_ERROR,
  SALT_ROUNDS,
} = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  UserModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
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
        throw new NotFoundError();
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => UserModel.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(new UserExist());
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
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
      next(err);
    });
};

module.exports = {
  getUser,
  updateProfile,
  createUser,
  login,
};
