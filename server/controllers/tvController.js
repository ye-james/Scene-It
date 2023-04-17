const tvController = {};
const Media = require("../models/MediaModel");

tvController.getPopularTVShows = async (req, res, next) => {
  try {
    if (!res.locals.popTvShows) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US&append_to_response=images`
      );
      const data = await response.json();

      if (data) {
        res.locals.popTvShows = data.results;
        return next();
      }
    } else return next();
  } catch (err) {
    return next({ err, log: "Error retrieving TV shows", status: 400 });
  }
};

tvController.checkIfFavorite = async (req, res, next) => {
  const newList = [];
  for (const show of res.locals.popTvShows) {
    //console.log(show);
    let newObj;
    const result = await Media.findOne({ id: show.id });
    const data = await result;
    if (data) {
      newObj = {
        ...show,
        favorite: result.favorite,
      };
    } else {
      newObj = {
        ...show,
        favorite: false,
      };
    }
    newList.push(newObj);
  }
  res.locals.popTvShows = newList;
  return next();
};

tvController.setFavorite = async (req, res, next) => {
  const { id } = req.body;
  const result = await Media.findOne({ id });
  if (result) {
    Media.findOneAndUpdate(
      { id },
      [{ $set: { favorite: { $not: "$favorite" } } }],
      { new: true }
    ).then((set) => {
      console.log(set);
      if (set)
        res
          .status(200)
          .json({ success: "success", setFavorite: set.favorite, id: set.id });
    });
  } else {
    const createdNewFavorite = await Media.create({
      id,
      favorite: true,
      watched: false,
      to_watch: false,
      media_type: "tv",
    });
    if (createdNewFavorite) {
      console.log(createdNewFavorite);
      if (createdNewFavorite)
        res.status(200).json({
          success: "success",
          setFavorite: createdNewFavorite.favorite,
          id: createdNewFavorite.id,
        });
    }
  }
};

module.exports = tvController;
