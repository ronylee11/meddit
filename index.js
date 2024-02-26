require("dotenv").config(); // load .env
const express = require("express");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const feed = require("./controllers/feeds");
const user = require("./controllers/users");
const mongoose = require("mongoose"); // connect database
// login register
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const feedRoutes = require("./routes/feeds");
const apiRoutes = require("./routes/apis");

const dbUrl = process.env.DB_URL;// || "mongodb://localhost:27017/Meddit"; // 27017 is the default mongodb port

mongoose.set("strictQuery", false); // disable deprecation warning
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const app = express();

app.engine("ejs", ejsMate); // use ejs-mate for layout
app.set("view engine", "ejs"); // use .ejs files for frontend
app.use(express.static(path.join(__dirname, "public"))); // connect css & js files in /public
app.use(express.urlencoded({ extended: true })); //enable req.body to be parsed
app.use(methodOverride("_method")); // enable PUT and DELETE requests

// session settings
const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  //store: mongo, // by default it uses memory storage, goes away on application restart
  cookies: {
    httpOnly: true,
    //secureOnly: true, // only works on https
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig)); // enable session
app.use(flash()); // enable flash messages (req.flash())

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware
app.use((req, res, next) => {
  //console.log(req.query);
  //console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", feed.home);

app.use("/feeds", feedRoutes);

app.use("/", userRoutes);

app.use("/api", apiRoutes);

app.get("/users/login", function (req, res) {res.render("user/login");});

app.get("/users/register", function (req, res) {res.render("user/register");});

app.post("/users/auth", user.loginUser);

app.post("/users/createUser", user.createUser)

app.listen(3000, () => {
  console.log("App is running on 3000!");
});
