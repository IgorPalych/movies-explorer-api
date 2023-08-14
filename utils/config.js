const config = {
  MONGO_DUPLICATE_KEY_ERROR: 11000,
  SALT_ROUNDS: 10,
  RATE_LIMIT_SETTINGS: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
};

module.exports = config;
