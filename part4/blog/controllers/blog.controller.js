const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  });

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', async (req, res) => {
  console.log('blog-user: ', req.user);
  const body = req.body;
  const token = req.token;
  // console.log('1::', req.body);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log('::1decodedToken: ', decodedToken);

  if (!decodedToken.id || !token) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }
  // req.user = decodedToken.id;
  // console.log('ba: ', req.user);

  if (!body.title || !body.url) {
    return res.status(400).json({
      error: 'title or url  was missing ',
    });
  }

  // get User by ID
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title || '',
    author: body.author || '',
    url: body.url || '#',
    likes: body.likes,
    user: user._id,
  });
  // console.log(JSON.stringify(blog));

  const savedBlog = await blog.save();
  console.log(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  // console.log('2::', savedBlog);
  res.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      content: 'query',
    }
  );

  res.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  // // console.log('::decodedToken: ', decodedToken);

  if (!decodedToken.id || !token) {
    return response.status(401).json({
      error: 'token invalid or missing',
    });
  }

  // req.user = decodedToken.id;
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (blog && blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  }

  res.status(401).send({
    error: 'Unauthorized to access the blog',
  });
});

module.exports = blogsRouter;
