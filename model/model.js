const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uploaded_file: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  cloudinary_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

const Story = mongoose.model("Post", PostSchema);

module.exports = Story;
