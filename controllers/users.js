// Using the User model, retrieve data and respond data
const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, email });
    await User.register(user, password);
    req.flash("success", "Successfully registered!");
    res.redirect("/feeds");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.login = (req, res) => {
  res.render("users/login", { isLoggedIn: req.isAuthenticated() });
};

module.exports.register = (req, res) => {
  res.render("users/register", { isLoggedIn: req.isAuthenticated()});
};

module.exports.loginUser = (req, res) => {
  // once it reaches here, it means the user is authenticated
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/feeds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => (err ? next(err) : null));
  req.flash("success", "Goodbye!");
  res.redirect("/feeds");
};
