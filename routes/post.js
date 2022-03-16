const express = require("express");
const Router = express.Router();
const postController = require("../controller/post");
const authController = require("../controller/authen"); //added this as psssport wants to redirect to /signin
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const passport = require("passport");

Router.get(
  "/viewFavoritePosts",
  passport.checkAuthentication,
  postController.viewFavoritePosts
);
Router.post(
  "/add",
  passport.checkAuthentication,
  upload.single("uploaded_file"),
  postController.newPost
);
Router.get("/stories", passport.checkAuthentication, postController.viewPost);

Router.post("/apisend", passport.checkAuthentication, postController.delId);
Router.post("/like/:id", passport.checkAuthentication, postController.likePost);

module.exports = Router;
