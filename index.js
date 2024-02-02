const express = require("express");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const feed = require("./controllers/feeds");
const mongoose = require("mongoose"); // connect database

mongoose.set("strictQuery", false); // disable deprecation warning
mongoose.connect("mongodb://127.0.0.1:27017/Meddit"); // 27017 is the default mongodb port
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const app = express();

app.engine("ejs", ejsMate); // use ejs-mate for layout
app.set("view engine", "ejs"); // use .ejs files for frontend
app.use(express.static(path.join(__dirname, "public"))); // connect css & js files in /public

app.get("/", feed.home);

app.get("/feeds", feed.index);

app.get("/feeds/:id/edit", feed.edit);

app.get("/feeds/:id", feed.show);

app.listen(3000, () => {
  console.log("App is running on 3000!");
});
