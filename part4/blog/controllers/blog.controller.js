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

// const getTokenFrom = (request) => {
//   const authorization = request.get('Authorization');

//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '');
//   }

//   return null;
// };

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  // console.log('1::', req.body);

  const decodedToken = jwt.verify(
    // getTokenFrom(req),
    req.token,
    process.env.SECRET
  );
  console.log('::decodedToken: ', decodedToken);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid',
    });
  }

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
  console.log('::req.params ', req.params);
  const decodedToken = jwt.verify(
    // getTokenFrom(req),
    req.token,
    process.env.SECRET
  );
  // console.log('::decodedToken: ', decodedToken);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid',
    });
  }

  const blog = await Blog.findById(req.params.id);
  console.log('::blog ', blog);
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  }

  res.status(401).send({
    error: 'Unauthorized to access the blog',
  });
});

module.exports = blogsRouter;
