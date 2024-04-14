const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feeds");
const { isLoggedIn } = require("../middleware");
const multer = require("multer");

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
});
const upload = multer({ storage });

router
    .get("/", feedController.index)
    .post("/", upload.single("image"), feedController.create)

router
    .get("/new", feedController.new)

router
    .get("/m/:id/edit", feedController.edit)
    .post("/m/:id/comment", isLoggedIn, feedController.comment)
    .post("/m/:id/upvotefeed", feedController.upvotefeed)
    .post("/m/:id/downvotefeed", feedController.downvotefeed)
    .post("/m/:feedid/:id/upvotecomment", feedController.upvotecomment)
    .post("/m/:feedid/:id/downvotecomment", feedController.downvotecomment)
    .post("/m/:feedid/:id/reply", feedController.reply)
    

router
    .get("/m/:id", feedController.show)
    .post("/m/:id", feedController.update)
    .delete("/m/:id", feedController.destroy)

module.exports = router;
