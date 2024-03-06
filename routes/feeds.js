const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feeds");

router
    .get("/", feedController.index)
    .post("/", feedController.create)

router
    .get("/new", feedController.new)

router
    .get("/:id/edit", feedController.edit)
    .post("/:id/comment", feedController.comment)
    .post("/:id/upvotefeed", feedController.upvotefeed)
    .post("/:feedid/:id/upvotecomment", feedController.upvotecomment)
    .post("/:id/reply", feedController.reply)
    

router
    .get("/:id", feedController.show)
    .post("/:id", feedController.update)
    .delete("/:id", feedController.destroy)

module.exports = router;
