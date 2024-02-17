const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const passport = require("passport");

router
  .route("/register")
  .get(userController.register)
  .post(userController.createUser);

router
  .route("/login")
  .get(userController.login)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    userController.loginUser
  );

router.route("/logout").get(userController.logout);

module.exports = router;
