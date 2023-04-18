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

module.exports = listController;
