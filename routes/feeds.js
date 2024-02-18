const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feeds");

router
    .get("/", feedController.index)

router
    .get(":id/edit", feedController.edit)

router
    .get(":id", feedController.show)
    .post(":id", feedController.update)
    .delete(":id", feedController.destroy)

module.exports = router;
