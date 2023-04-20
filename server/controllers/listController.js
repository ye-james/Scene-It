const Media = require("../models/MediaModel");

const listController = {};

listController.getAll = async (req, res, next) => {
  try {
    const result = await Media.find();
    if (result) res.locals.allShows = result;
    return next();
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
  const { id, title, media_type } = req.body;
  console.log(req.body);

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
      title,
      favorite: true,
      watched: false,
      to_watch: false,
      media_type,
    });
    if (createdNewFavorite)
      res.status(200).json({
        success: "success",
        setFavorite: createdNewFavorite.favorite,
        id: createdNewFavorite.id,
      });
  }
};

listController.addToWatchList = async (req, res, next) => {
  const { id, title, media_type } = req.body;
  const result = await Media.findOne({ id });
  if (result) {
    Media.findOneAndUpdate({ id }, { to_watch: true }, { new: true }).then(
      (added) => {
        if (added)
          res.status(200).json({
            success: "success",
            to_watch: added.to_watch,
            id: added.id,
            title: added.title,
          });
      }
    );
  } else {
    const newItem = await Media.create({
      id,
      title,
      favorite: false,
      watched: false,
      to_watch: true,
      media_type,
    });
    if (newItem)
      res.status(200).json({
        success: "success",
        to_watch: newItem.to_watch,
        id: newItem.id,
      });
  }
};

listController.deleteFromWatchList = async (req, res, next) => {
  const { id } = req.body;
  const result = await Media.findOne({ id });
  if (result) {
    Media.findOneAndUpdate({ id }, { to_watch: false }, { new: true }).then(
      (added) => {
        if (added) {
          res.status(200).json({
            success: "success",
            to_watch: added.to_watch,
            id: added.id,
            title: added.title,
          });
        }
      }
    );
  } else {
    return next({
      log: "Error removing from watch list",
      message: { err: "Error removing from watch list" },
      status: 400,
    });
  }
};

listController.addToWatchedList = async (req, res, next) => {
  const { id, title, media_type } = req.body;
  const result = await Media.findOne({ id });
  if (result) {
    Media.findOneAndUpdate(
      { id },
      { to_watch: false, watched: true },
      { new: true }
    ).then((added) => {
      if (added)
        res.status(200).json({
          success: "success",
          watched: added.watched,
          id: added.id,
          title: added.title,
        });
    });
  } else {
    const newItem = await Media.create({
      id,
      title,
      favorite: false,
      watched: true,
      to_watch: false,
      media_type,
    });
    if (newItem)
      res.status(200).json({
        success: "success",
        to_watch: newItem.watched,
        id: newItem.id,
      });
  }
};

listController.deleteFromWatchedList = async (req, res, next) => {
  const { id } = req.body;
  const result = await Media.findOne({ id });
  if (result) {
    Media.findOneAndUpdate({ id }, { watched: false }, { new: true }).then(
      (added) => {
        if (added) {
          res.status(200).json({
            success: "success",
            watched: added.watched,
            id: added.id,
            title: added.title,
          });
        }
      }
    );
  } else {
    return next({
      log: "Error removing from watch list",
      message: { err: "Error removing from watch list" },
      status: 400,
    });
  }
};

module.exports = listController;
