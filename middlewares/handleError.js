const { UNHANDLE_MESSAGE } = require('../utils/constants');

const handleError = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? UNHANDLE_MESSAGE
      : message,
  });
  next();
});

module.exports = { handleError };
