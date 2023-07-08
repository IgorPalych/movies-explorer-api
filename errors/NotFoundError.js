const { NOT_FOUND_USER_MESSAGE } = require('../utils/constants');

class NotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.name = 'NotFoundError';
    this.message = NOT_FOUND_USER_MESSAGE;
  }
}

module.exports = NotFoundError;
