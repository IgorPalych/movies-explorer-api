const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = UNAUTHORIZED_MESSAGE;
  }
}

module.exports = UnauthorizedError;
