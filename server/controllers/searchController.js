const searchController = {};
const fetch = require("node-fetch");

searchController.search = async (req, res, next) => {
  const { queryString } = req.body;
  if (!queryString || queryString === "")
    next({
      message: "Invalid query string",
      status: 400,
      log: "Error in search controller. Possibly bad query string.",
    });
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      process.env.API_KEY
    }&language=en-US&query=${encodeURI(queryString)}&page=1&include_adult=false`
  );
  const data = await response.json();
  if (data) res.status(200).json(data);
};

searchController.findList = (req, res, next) => {
  const promises = [];
  res.locals.allShows.forEach((show) => {
    promises.push(
      fetch(
        `https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.API_KEY}`
      )
    );
  });

  Promise.all(promises)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((shows) => {
      const newList = [...res.locals.allShows];
      shows.forEach((show) => {
        const index = res.locals.allShows.findIndex(
          (currShow) => currShow.id === show.id
        );
        const { id, favorite, watched, to_watch, media_type } = newList[index];
        const updatedShow = {
          id,
          favorite,
          watched,
          to_watch,
          media_type,
          name: show.name,
          img_path: show.backdrop_path,
        };

        newList[index] = updatedShow;
      });
      res.locals.allShows = newList;
      res.status(200).json(res.locals.allShows);
    });
};

searchController.getMediaInfo = (req, res, next) => {
  const { id } = req.params;
  const { media } = req.query;

  fetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) res.status(200).json(data);
    })
    .catch((err) => {
      return next({
        log: "Error retrieving show info",
        message: { err },
        status: 400,
      });
    });
};

module.exports = searchController;
