const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRouter = require("./routes/posts");

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
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use( "/api/posts" , postsRouter);
module.exports = app;
