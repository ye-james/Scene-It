const searchController = {};
const fetch = require("node-fetch");

searchController.search = async (req, res, next) => {
  try {
    const { queryString } = req.body;
    if (!queryString || queryString === "")
      next({
        message: "Invalid query string",
        status: 400,
        log: "Error in search controller. Possibly bad query string.",
      });
    const response =
      await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.API_KEY
      }&query=${queryString.replace(" ", "+")}
    `);
    const data = await response.json();
    if (data) res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = searchController;
