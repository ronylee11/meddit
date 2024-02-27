const Feed = require("../models/feed");
const User = require("../models/user");

module.exports.getFeeds = async (req, res) => {
  const feeds = await Feed.find({});
  res.json(feeds);
};

module.exports.getFeed = (req, res) => {
  const feed = Feed.find({"_id": req.param.id});
  res.json(feed);
};

module.exports.getUser = async (req, res) => {
  const user = User.find({"_id" : req.param.uid});
  res.json(user);
}