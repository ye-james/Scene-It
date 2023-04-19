const Media = require("../models/MediaModel");

const listController = {};

listController.getAll = async (req, res, next) => {
  try {
    const result = await Media.find();
    if (result) res.status(200).json({ result });
  } catch (err) {
    return next({
      log: "Error retrieving list",
      message: { err: err },
      status: 400,
    });
  }
};

listController.getFavorites = async (req, res, next) => {
  try {
    const result = await Media.find({ favorite: true });
    if (result) {
      res.locals.favoritesList = result;
      return next();
      // res.status(200).json({ result });
    }
  } catch (err) {
    return next({
      log: "Error retrieving list",
      message: { err: err },
      status: 400,
    });
  }
};

listController.setFavorite = async (req, res, next) => {
  const { id } = req.body;
  const result = await Media.findOne({ id });
  if (result) {
    Media.findOneAndUpdate(
      { id },
      [{ $set: { favorite: { $not: "$favorite" } } }],
      { new: true }
    ).then((set) => {
      if (set)
        res.status(200).json({
          success: "success",
          setFavorite: set.favorite,
          id: set.id,
        });
    });
  } else {
    const createdNewFavorite = await Media.create({
      id,
      favorite: true,
      watched: false,
      to_watch: false,
      media_type: "tv",
    });
    if (createdNewFavorite)
      res.status(200).json({
        success: "success",
        setFavorite: createdNewFavorite.favorite,
        id: createdNewFavorite.id,
      });
  }
};

module.exports = listController;
