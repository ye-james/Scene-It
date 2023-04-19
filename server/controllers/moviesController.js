const moviesController = {};
const Media = require("../models/MediaModel");

moviesController.getPopularMovies = async (req, res, next) => {
  try {
    if (!res.locals.popMovies) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US&append_to_response=images`
      );
      const data = await response.json();

      if (data) {
        res.locals.popMovies = data.results;
        next();
      }
    } else next();
  } catch (err) {
    return next({ err, log: "Error retrieving movies", status: 400 });
  }
};

moviesController.favoriteMovie = (req, res, next) => {

  const newMedia = new Media(testMedia);
  newMedia
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = moviesController;
