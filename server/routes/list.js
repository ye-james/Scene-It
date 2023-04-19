const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const searchController = require("../controllers/searchController");

router.get("/", listController.getAll, searchController.findList);
router.patch("/add", listController.addToWatchList);
router.patch("/favorite", listController.setFavorite);

module.exports = router;
