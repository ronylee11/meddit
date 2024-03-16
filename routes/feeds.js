const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feeds");

router
    .get("/", feedController.index)
    .post("/", feedController.create)

router
    .get("/new", feedController.new)

router
    .get("/m/:id/edit", feedController.edit)
    .post("/m/:id/comment", feedController.comment)
    .post("/m/:id/upvotefeed", feedController.upvotefeed)
    .post("/m/:feedid/:id/upvotecomment", feedController.upvotecomment)
    .post("/m/:id/reply", feedController.reply)
    

router
    .get("/m/:id", feedController.show)
    .post("/m/:id", feedController.update)
    .delete("/m/:id", feedController.destroy)

module.exports = router;
