// Using the User model, retrieve data and respond data
const User = require("../models/user");


module.exports.createUser = async (req, res) => {
  const { username, password, cpassword, email } = req.body;
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if(username && email.match(emailFormat) && password == cpassword){
    try{
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
          if (err) return next(err);
          req.flash("success", "Successfully registered!");
          res.redirect("/");
      });
    }catch (ex){
      console.log("Duplicate User");
      req.flash("error", "User already exist!");
      //Reload page
      res.redirect(req.get('referer'));
    }
  }else{
    console.log("Input error");
      if (password !== cpassword) {
          req.flash("error", "Password and Confirm Password does not match!");
      } else if (!email.match(emailFormat)) {
          req.flash("error", "Invalid email format!");
      } else {
          req.flash("error", "Invalid input!");
      }
    //Reload page
    res.redirect(req.get('referer'));
   }
};

module.exports.login = (req, res) => {
  res.render("users/login", { isLoggedIn: req.isAuthenticated() });
};

module.exports.register = (req, res) => {
  res.render("users/register", { isLoggedIn: req.isAuthenticated()});
};

module.exports.loginUser = (req, res) => {
  // once it reaches here, it means the user is authenticated
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => (err ? next(err) : null));
  req.flash("success", "Goodbye!");
  res.redirect("/");
};

module.exports.viewProfile = async (req, res) => {
  if(req.params.id !== undefined || req.user){
    const user = await User.findById(req.params.id ? req.params.id : req.user);
    
    res.render("users/profile", {isLoggedIn : req.isAuthenticated(), user: user });
  }else{
    req.flash("error", "Please Login!");
    res.redirect("/login");
  }
}
