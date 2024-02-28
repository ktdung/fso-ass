const blogsRouter = require('express').Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  // console.log('1::', req.body);

  if (!body.title || !body.url) {
    return res.status(400).json({
      error:
        'title or url properties are missing from the request data',
    });
  }

  // get User by ID
  const user = await User.findById(body.user);
  console.log(user);

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
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = blogsRouter;
