const Feed = require("../models/Feed");

module.exports.getFeeds = async (req, res) => {
  const feeds = await Feed.find({});
  res.json(feeds);
};
