const MovieModel = require('../models/movie');

const getMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find({ owner: req.user._id });
    res.send({ data: movies });
  } catch (err) {
    console.log(err);
  }
};

const createMovie = async (req, res) => {
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
    console.log(err);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) {
      throw new Error('Нет такого фильма');
    }
    if (!movie.owner.equals(req.user._id)) {
      throw new Error('У вас нет прав на удаление этого фильма');
    }
    await MovieModel.deleteOne(movie);
    res.send({ message: 'Фильм удален' });
  } catch (err) {
    console.log(err.name);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
