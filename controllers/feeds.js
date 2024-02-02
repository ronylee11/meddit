const Feed = require("../models/feed");

module.exports.home = (req, res) => {
  res.render("home");
};

module.exports.index = async (req, res) => {
  const feeds = await Feed.find({});
  res.render("feeds/index", { feeds });
};

module.exports.show = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  res.render("feeds/show", { feed });
};

module.exports.edit = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  res.render("feeds/edit", { feed });
};
