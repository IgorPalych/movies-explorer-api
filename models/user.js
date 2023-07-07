const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Неправильные почта или пароль');
      } else {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new Error('Неправильные почта или пароль');
            } else {
              return user;
            }
          });
      }
    });
};

module.exports = mongoose.model('user', userSchema);
