const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();

app.set("view engine", "ejs"); // use .ejs files for frontend
app.use(express.static(path.join(__dirname, "public"))); // connect css & js files in /public

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App is running!");
});
