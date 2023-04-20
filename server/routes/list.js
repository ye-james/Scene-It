const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const searchController = require("../controllers/searchController");

router.get("/", listController.getAll, searchController.findList);
router.patch("/watchlist/add", listController.addToWatchList);
router.patch("/watchlist/delete", listController.deleteFromWatchList);
router.patch("/watched/add", listController.addToWatchedList);
router.patch("/watched/delete", listController.deleteFromWatchedList);
router.patch("/favorite", listController.setFavorite);

module.exports = router;
