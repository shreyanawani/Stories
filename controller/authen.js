const express = require("express");
const app = express();
const passport = require("passport");

const User = require("../model/user");
const bcrypt = require("bcrypt");
const initialize = require("../config/passport-config");
// const res = require("express/lib/response");

// initialize(passport, (email) => User.find((user) => user.username === email));

const newSignUp = (async = (req, res, next) => {
  //   await User.findById(req.body._id,function(err,docs){
  //     if(err)console.log(err);
  //     else
  //     return
  // });         TODO
  if (req.isAuthenticated()) {
    return res.redirect("/posts/stories");
  }
  // req.flash("message", "Success!!");
  // res.send(req.flash("message"));
  // console.log("e");
  return res.render("users/signup", { messages: req.flash("message") });
  // return res.render("signup");
});
const newSignIn = (async = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/posts/stories");
  }
  return res.render("users/signin", { message: req.flash("error") });
});

// const profile = async (req, res, next) => {
//   console.log("hy");
//   // console.log(user);
//   res.render("pro");
// };
const signUp = async (req, res, next) => {
  try {
    User.find({ username: req.body.username }, async function (err, docs) {
      if (err) {
        console.log(err);
      }
      if (docs) {
        req.flash("message", "Username already exists!Try something else.");
        return res.redirect("/");
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashedPassword);
        let newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        console.log(newUser);
        await newUser.save();
        return res.render("users/signin");
      }
    });
  } catch {
    return res.render("users/signup");
  }
};

const logOut = async (req, res, next) => {
  req.logout();
  return res.redirect("/"); //?? diff render redirect
};

module.exports = { signUp, newSignUp, newSignIn, logOut };

//cookie erase as soon as we kill server
