const Feed = require("../models/feed");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.home = (req, res) => {
  res.render("home", { isLoggedIn: req.isAuthenticated() });
};

module.exports.index = async (req, res) => {
  const { search } = req.query;
  let feeds;
  if (search && search !== "") {
    feeds = await Feed.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
  } else {
    feeds = await Feed.find({});
  }

  res.render("feeds/index", {
    feeds,
    isLoggedIn: req.isAuthenticated(),
    search,
  });
};

module.exports.show = async (req, res) => {
  const feed = await Feed.findById(req.params.id)
    .populate("author");
  let comments;

    try {
        comments = await Comment.find({_id: feed.comments}).populate("author");
    } catch (e) {
        console.log(e);
    }

  const isLoggedIn = req.isAuthenticated();
  res.render("feeds/show", { feed, comments, isLoggedIn , isOwner: isLoggedIn ? feed.author._id.equals(req?.user?._id) : false });
};

module.exports.edit = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  res.render("feeds/edit", { feed, isLoggedIn: req.isAuthenticated()});
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const feed = await Feed.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/m/${id}`);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Feed.findByIdAndDelete(id);
  res.redirect("/");
};

module.exports.new = (req, res) => {
  res.render("feeds/new", { isLoggedIn: req.isAuthenticated()});
};

module.exports.create = async (req, res) => {
  const feed = new Feed(req.body);
  feed.author = req.user;
  await feed.save();

  req.user.feeds.push(feed);
  await req.user.save();

  res.redirect("/");
};

module.exports.upvotefeed = async (req, res) => {

  if(req?.user){
    const feedvoted = await Feed.find({_id: req.params.id, upvotes: req.user._id});
    const feed = await Feed.findById(req.params.id);
    //logged in

    if(feedvoted.length == 0){
      //Unvoted then add
      feed.upvotes.push(req.user);
    }else{
      //Voted then negate
      feed.upvotes.pull(req.user);   
    }
    feed.save();
    res.redirect(`/m/${req.params.id}`);
  }
  else{
    req.flash("error", "Please Login!");//Redirect to login?
    //Reload page
    res.redirect(req.get('referer'));
  }
}

//Comment
module.exports.comment = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  if(req?.user){
    const comment = new Comment({
      author: req.user,
      description: req.body.comment,
      date: Date.now(),
    });
    await comment.save();
    feed.comments.push(comment);
   await feed.save();
  }
  else{
    req.flash("error", "Please Login!");//Redirect to login?
  }
  res.redirect(`/m/${req.params.id}`);
}

module.exports.upvotecomment = async (req, res) => {
  const commentvoted = await Comment.find({_id: req.params.id, upvotes: req.user._id});
  const comment = await Comment.findById(req.params.id);

  if(req?.user){
    //logged in

    if(commentvoted.length == 0){
      //Unvoted then add
      comment.upvotes.push(req.user);
    }else{
      //Voted then negate
      comment.upvotes.pull(req.user);
    }
    comment.save();
    res.redirect(`/m/${req.params.feedid}`);
  }
  else{
    req.flash("error", "Please Login!");//Redirect to login?
    //Reload page
    res.redirect(req.get('referer'));
  }
}

module.exports.reply = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if(req?.user){
    const newcomment = new Comment({
      author: req.user,
      description: req.body.comment,
      date: Date.now(),
    });
    await comment.save();
    comment.reply.push(newcomment);
   await comment.save();
  }
  else{
    req.flash("error", "Please Login!");//Redirect to login?
  }
  res.redirect(`/m/${req.params.id}`);
}
