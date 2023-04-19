const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const searchController = require("../controllers/searchController");

router.get("/", listController.getFavorites, searchController.findList);
router.patch("/", listController.setFavorite);

module.exports = router;
