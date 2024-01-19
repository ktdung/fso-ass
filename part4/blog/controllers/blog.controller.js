const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
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

  const blog = new Blog({
    title: body.title || '',
    author: body.author || '',
    url: body.url || '#',
    likes: body.likes,
  });
  // console.log(JSON.stringify(blog));

  const savedBlog = await blog.save();
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
