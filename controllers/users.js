// Using the User model, retrieve data and respond data
const { response } = require("express");
const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { username, password, cPassword, email } = req.body;

  if (password == cPassword){
      const user = new User({ username, password, email });
  user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
  }
  else{
      console.log("Password mismatched");
  }

};

module.exports.auth = async (req, res) =>{
  try{
    const username = await req.body.username;
    const password = await req.body.password;

    console.log(username);
    console.log(password);
    const user = await User.findOne({username: username, password: password});
    if(user){
      res.render("/feeds/index");
    }
  }
  catch (ex){
    return res.status(500).json({ex});
  }
}
