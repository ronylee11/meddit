const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apis");

router.get("/feeds", apiController.getFeeds);

module.exports = router;
