const { BAD_REQUEST_MESSAGE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = BAD_REQUEST_MESSAGE;
  }
}

module.exports = BadRequestError;
