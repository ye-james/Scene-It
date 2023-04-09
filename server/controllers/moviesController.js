const moviesController = {};

moviesController.getPopularMovies = async (req, res, next) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();

    if (data) res.status(200).json(data);
  } catch (err) {
    return next({ err, log: "Error retrieving movies", status: 400 });
  }
};

module.exports = moviesController;
