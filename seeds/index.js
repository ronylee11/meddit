const mongoose = require("mongoose");
const Feed = require("../models/feed");
const faker = require("faker");

mongoose.connect("mongodb://localhost:27017/Meddit");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!");
});

const seedDB = async () => {
  await Feed.deleteMany({});

  for (i = 0; i < 10; i++) {
    const feed = new Feed({
      title: faker.random.words(2),
      description: faker.hacker.phrase(),
    });
    await feed.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});