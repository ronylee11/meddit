// Using the User model, retrieve data and respond data
const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, email });
  await User.register(user, password);
  req.flash("success", "Successfully registered!");
  res.redirect("/feeds");
};

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.register = (req, res) => {
  res.render("users/register");
};
