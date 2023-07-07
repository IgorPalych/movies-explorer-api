const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
