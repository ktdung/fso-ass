const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  console.log('1::', req.body);

  const blog = new Blog({
    title: body.title || '',
    author: body.author || '',
    url: body.url || '#',
    likes: Number(body.likes) || 0,
  });
  // console.log(JSON.stringify(blog));

  const savedBlog = await blog.save();
  console.log('2::', savedBlog);
  res.status(201).json(savedBlog);
});

module.exports = blogsRouter;
