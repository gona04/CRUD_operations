const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://gandhigoonja:kRWezM2TykYHRWZ8@clusternew.4wzxa0j.mongodb.net/CRUDPractice?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => {console.log("Connected to mongoDB SUCESSFULLY")})
.catch((error) => { console.log(error, "Due to some issue could not connect to mongo db") });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
 Post.find().then(document => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: document
  });
 })
});

app.delete("/api/posts/:id", (req, res, next) => {
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

app.put("api/posts/:id", (req, res, next) => {
  const post = new Post( {
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id })
})

module.exports = app;
