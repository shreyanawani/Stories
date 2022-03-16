const express = require("express");
const Router = express.Router();
const passport = require("passport");
const postController = require("../controller/authen");
const storyController = require("../controller/post");

Router.post("/", postController.signUp);
Router.get("/logOut", postController.logOut);
Router.get("/profile", passport.checkAuthentication, storyController.viewPost);
Router.get("/", postController.newSignUp);
Router.get("/signin", postController.newSignIn);
Router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);
// Router.get("*", storyController.defaultRoute);

// input type=file name='image'
module.exports = Router;
