const router = require('express').Router();
const movieControllers = require('../controllers/movies');
const { validateMovieId, validateMovieData } = require('../middlewares/validate');

router.get('/', movieControllers.getMovies);

router.post('/', validateMovieData, movieControllers.createMovie);

router.delete('/:movieId', validateMovieId, movieControllers.deleteMovie);

module.exports = router;
