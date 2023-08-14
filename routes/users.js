const router = require('express').Router();
const userControllers = require('../controllers/users');
const { validateUserData } = require('../middlewares/validate');

router.get('/me', userControllers.getUserInfo);

router.patch('/me', validateUserData, userControllers.updateProfile);

module.exports = router;
