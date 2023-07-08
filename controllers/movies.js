const MovieModel = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await MovieModel.find({ owner: req.user._id });
    res.send({ data: movies });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const movie = await MovieModel.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    res.send({ data: movie });
  } catch (err) {
    console.log(err.message);
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) {
      throw new NotFoundError();
    }
    if (!movie.owner.equals(req.user._id)) {
      throw new ForbiddenError();
    }
    await MovieModel.deleteOne(movie);
    res.send({ message: 'Фильм удален' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
