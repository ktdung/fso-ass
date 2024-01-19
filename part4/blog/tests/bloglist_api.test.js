const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./bloglist_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    let data = await blogObject.save();
  }
});

test('list all blogpost', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('4.9 Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id.', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBe(undefined);
});

test('4.10 Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.', async () => {
  const newBlog = new Blog({
    title: 'Learn how to learn',
    author: 'Barbara Oakley',
    url: 'https://www.coursera.org/learn/learning-how-to-learn',
    likes: 10,
  });

  await api
    .post('/api/blogs')
    .setEncoding(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
