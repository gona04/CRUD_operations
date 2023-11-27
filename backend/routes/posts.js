const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Post = require('../models/post');

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

router.get("", (req, res, next) => {
 Post.find().then(document => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: document
  });
 })
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  const postId = new ObjectId(req.params.id);
  Post.deleteOne({ _id: postId})
  .then(deleteResult => {
    result = deleteResult;
    console.log(result);
    res.status(200).json({ message: "Post Deleted" });
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  });
})

router.put("/:id", (req, res, next) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }

  const updatedPost = {
    title: req.body.title,
    content: req.body.content
  };

  Post.updateOne({ _id: postId }, { $set: updatedPost })
    .then(updateResult => {
      if (updateResult.nModified === 0) {
        return res.status(404).json({ message: "Post not found or not modified" });
      }

      res.status(200).json({
        message: "Post updated successfully"
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
