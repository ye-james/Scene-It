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

module.exports = searchController;
