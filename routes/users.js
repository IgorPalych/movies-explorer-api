const router = require('express').Router();
const userControllers = require('../controllers/users');

router.get('/me', userControllers.getUser);

router.patch('/me', userControllers.updateProfile);

module.exports = router;
