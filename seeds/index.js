require("dotenv").config(); // load .env
const mongoose = require("mongoose");
const Feed = require("../models/feed");
const User = require("../models/user");
const Comment = require("../models/comment");
const faker = require("faker");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/Meddit";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!");
});

const seedDB = async () => {
  await Feed.deleteMany({});
  await User.deleteMany({});
  await Comment.deleteMany({});

  const user = new User({ username: "admin", email: "admin@test.com" });
  await User.register(user, "admin");

  for (i = 0; i < 10; i++) {
    const feed = new Feed({
      title: faker.random.words(2),
      description: faker.hacker.phrase(),
      author: user._id,
      image: "https://images.unsplash.com/photo-1708725805654-287ed8e7b70d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });
    await feed.save();
  }

  for (j = 0; j < 3; j++) {
    const comment = new Comment({
      author: user._id,
      description: faker.hacker.phrase(),
      date: faker.date.past(),
    });
    await comment.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
