const { INCORRECT_EMAIL_OR_PASS_MESSAGE } = require('../utils/constants');

class LoginError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = INCORRECT_EMAIL_OR_PASS_MESSAGE;
  }
}

module.exports = LoginError;
