const router = require('express').Router();
const movieControllers = require('../controllers/movies');

router.get('/', movieControllers.getMovies);

router.post('/', movieControllers.createMovie);

router.delete('/:movieId', movieControllers.deleteMovie);

module.exports = router;
