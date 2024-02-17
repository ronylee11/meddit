const Feed = require("../models/feed");

module.exports.home = (req, res) => {
  res.render("home");
};

module.exports.index = async (req, res) => {
  const feeds = await Feed.find({});
  res.render("feeds/index", { feeds, isLoggedIn: req.isAuthenticated() });
};

module.exports.show = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  res.render("feeds/show", { feed, isLoggedIn: req.isAuthenticated() });
};

module.exports.edit = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  res.render("feeds/edit", { feed, isLoggedIn: req.isAuthenticated() });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const feed = await Feed.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/feeds/${id}`);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Feed.findByIdAndDelete(id);
  res.redirect("/feeds");
};
