const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router
  .route("/register")
  .get(userController.register)
  .post(userController.createUser);

router
    .route("/login")
    .get(userController.login);
    //.post(userController.loginUser);

module.exports = router;
