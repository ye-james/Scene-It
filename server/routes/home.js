const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const tvController = require("../controllers/tvController");

router.get(
  "/",
  moviesController.getPopularMovies,
  tvController.getPopularTVShows,
  tvController.checkIfFavorite,
  (req, res) => {
    res
      .status(200)
      .json({ movies: res.locals.popMovies, tvShows: res.locals.popTvShows });
  }
);

router.patch("/", tvController.setFavorite);

module.exports = router;
