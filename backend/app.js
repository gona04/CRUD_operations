const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
  )
  next();
});


app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log('post reached');
  console.log(post);
  res.status(201).json({
    message: 'Post added in backend successfully'
  });
});

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {id: '1ab2c3', title: 'first server-side post', content: 'server-side content'},
    {id: '4d5e6f', title: 'second server-side post', content: 'second server-side content'}
  ]
  res.status(200).json({
    message: 'post fetched successfully',
    posts: posts
  })
});

module.exports = app;
