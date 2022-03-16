const express = require("express");
const res = require("express/lib/response");
const app = express();
const path = require("path");
const Story = require("../model/model");
const Router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const passport = require("passport");

const delId = async (req, res, next) => {
  let user = req.body;
  await cloudinary.uploader.destroy(user.cid);
  const userPosts = await Story.findById(user.id);
  await userPosts.remove();
  return;
};

const newPost = async (request, response, next) => {
  try {
    const pic = await cloudinary.uploader.upload(request.file.path);
    let userr = new Story({
      date: request.body.name,
      uploaded_file: pic.secure_url,
      caption: request.body.caption,
      likes: request.body.likes,
      cloudinary_id: pic.public_id,
      user_id: request.user.username,
    });
    await userr.save();
    const userPosts = await Story.find({});
    response.render("index", { posts: userPosts });
  } catch (error) {
    console.log(error);
  }
};

const viewFavoritePosts = async (request, response, next) => {
  const userPosts = await Story.find({ likes: 1 });
  try {
    response.render("favs", { posts: userPosts });
  } catch (error) {
    response.status(500).send(error);
  }
};

const viewPost = async (request, response, next) => {
  const userPosts = await Story.find({});
  try {
    response.render("index", { posts: userPosts });
  } catch (error) {
    response.status(500).send(error);
  }
};

const delPost = async (request, response, next) => {
  try {
    const id = request.params.id;
    let user = await Story.findById(id);
    await cloudinary.uploader.destroy(user.cloudinary_id);
    await user.remove();
  } catch (error) {
    response.status(500).send(error);
  }
};

const likePost = async (request, response, next) => {
  try {
    const id = request.params.id;
    let user = await Story.findById(id);
    if (user.likes == 0)
      await Story.findOneAndUpdate({ _id: id }, { $set: { likes: 1 } });
    else await Story.findOneAndUpdate({ _id: id }, { $set: { likes: 0 } });
    const userPosts = await Story.find({});

    return;
  } catch (error) {
    response.status(500).send(error);
  }
};
const defaultRoute = async (req, res, next) => {
  return res.render("err");
};

module.exports = {
  newPost,
  viewPost,
  delPost,
  likePost,
  delId,
  viewFavoritePosts,
  defaultRoute,
};
