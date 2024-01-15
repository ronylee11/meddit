const express = require("express");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const feed = require("./controllers/feed");

const app = express();

app.engine("ejs", ejsMate); // use ejs-mate for layout
app.set("view engine", "ejs"); // use .ejs files for frontend
app.use(express.static(path.join(__dirname, "public"))); // connect css & js files in /public

app.get("/", feed.home);

app.listen(3000, () => {
  console.log("App is running on 3000!");
});
