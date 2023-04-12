const tvController = {};

tvController.getPopularTVShows = async (req, res, next) => {
  try {
    if (!res.locals.popTvShows) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US&append_to_response=images`
      );
      const data = await response.json();

      if (data) {
        res.locals.popTvShows = data.results;
        next();
      }
    } else next();
  } catch (err) {
    return next({ err, log: "Error retrieving TV shows", status: 400 });
  }
};

module.exports = tvController;
