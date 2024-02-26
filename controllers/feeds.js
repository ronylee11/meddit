const Feed = require("../models/feed");
const Comment = require("../models/comment");

module.exports.home = (req, res) => {
  res.render("home", { isLoggedIn: req.isAuthenticated() });
};

module.exports.index = async (req, res) => {
  const feeds = await Feed.find({});
  res.render("feeds/index", { feeds, isLoggedIn: req.isAuthenticated() });
};

module.exports.show = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  const comments = await Comment.find({_id: feed.comments});

  res.render("feeds/show", { feed, comments, isLoggedIn: req.isAuthenticated(), isOwner: feed.author._id.equals(req?.user?._id) });
};

module.exports.edit = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  res.render("feeds/edit", { feed, isLoggedIn: req.isAuthenticated()});
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

module.exports.new = (req, res) => {
  res.render("feeds/new", { isLoggedIn: req.isAuthenticated(), userid: req.user._id });
};

module.exports.create = async (req, res) => {
  const feed = new Feed(req.body);
  feed.author = req.user;
  await feed.save();

  req.user.feeds.push(feed);
  await req.user.save();

  res.redirect("/feeds");
};

//Comment
module.exports.comment = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  const comment = new Comment({
      author: req.user,
      description: req.body.comment,
      date: Date.now(),
      upvote: 0
    });
    await comment.save();
  feed.comments.push(comment);
  await feed.save();

  res.redirect(`/feeds/${req.params.id}`);
}
