const { USER_EXIST_MESSAGE } = require('../utils/constants');

class UserExist extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = USER_EXIST_MESSAGE;
  }
}

module.exports = UserExist;
