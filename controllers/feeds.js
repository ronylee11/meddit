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
  let comments
  try{ comments = await Comment.find({_id: feed.comments})
                         .populate("author")
                         .populate({path: "reply",
                         populate: [
                            {path: "author"},
                            {path: "reply"}
                          ]
                         });
      }catch (e){console.log(e);}

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
  feed.author = req.user._id;
  await feed.save();

  res.redirect("/");
};

module.exports.upvotefeed = async (req, res) => {

  if(req?.user){
    const feedUpVoted = await Feed.find({_id: req.params.id, upvotes: req.user._id});
    const feedDownVoted = await Feed.find({_id: req.params.id, downvotes: req.user._id});
    const feed = await Feed.findById(req.params.id);
    //logged in

    if (feedDownVoted.length > 0) { // if it is downvoted, undo
        feed.downvotes.pull(req.user);
    }

    if(feedUpVoted.length == 0){
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
    req.flash("error", "Please Login!");
    //Redirect to login
    res.redirect("/login");
    //Reload page
    //res.redirect(req.get('referer'));
  }
}

module.exports.downvotefeed = async (req, res) => {
  if(req?.user){

      const feedUpVoted = await Feed.find({_id: req.params.id, upvotes: req.user._id});
    const feedDownVoted = await Feed.find({_id: req.params.id, downvotes: req.user._id});
    const feed = await Feed.findById(req.params.id);
    //logged in

    if (feedUpVoted.length > 0) { // if it is upvoted, undo
        feed.upvotes.pull(req.user);
    }

    if(feedDownVoted.length == 0){
      //Unvoted then add
      feed.downvotes.push(req.user);
    }else{
      //Voted then negate
      feed.downvotes.pull(req.user);   
    }
    feed.save();
    res.redirect(`/m/${req.params.id}`);
  }
  else{
    req.flash("error", "Please Login!");
    //Redirect to login
    res.redirect("/login");
  }
}


//Comment
module.exports.comment = async (req, res) => {
  const feed = await Feed.findById(req.params.id);
  if(req?.user){
    if(req?.body.comment.trim() !== ""){
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
    req.flash("error", "Write something!");
  }
  }
  else{
    req.flash("error", "Please Login!");//Redirect to login?
    res.redirect("/login");
  }
  res.redirect(`/m/${req.params.id}`);
}

module.exports.upvotecomment = async (req, res) => {
  if(req?.user){
    const commentUpVoted = await Comment.find({_id: req.params.id, upvotes: req.user._id});
    const commentDownVoted = await Comment.find({_id: req.params.id, downvotes: req.user._id});
    const comment = await Comment.findById(req.params.id);
    //logged in

    if (commentDownVoted.length > 0) { // if it is downvoted, undo
      comment.downvotes.pull(req.user);
    }
    if(commentUpVoted.length == 0){
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

module.exports.downvotecomment = async (req, res) => {
  if(req?.user){
    //logged in
    const commentUpVoted = await Comment.find({_id: req.params.id, upvotes: req.user._id});
    const commentDownVoted = await Comment.find({_id: req.params.id, downvotes: req.user._id});
    const comment = await Comment.findById(req.params.id);

    if (commentUpVoted.length > 0) { // if it is downvoted, undo
      comment.upvotes.pull(req.user);
    }

    if(commentDownVoted.length == 0){
      //Unvoted then add
      comment.downvotes.push(req.user);
    }else{
      //Voted then negate
      comment.downvotes.pull(req.user);
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
    if(req?.body.reply.trim() !== ""){
      const newcomment = new Comment({
        author: req.user,
        description: req.body.reply,
        date: Date.now(),
      });
      await newcomment.save();
      comment.reply.push(newcomment);
      await comment.save();
    }
    else{
      req.flash("error", "Write something!");
    }
  }
  
  else{
    req.flash("error", "Please Login!");//Redirect to login?
    res.redirect("/login");
  }
  res.redirect(`/m/${req.params.feedid}`);
}
