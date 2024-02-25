const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const Blog = require('../models/blog.model');
const helper = require('./bloglist_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    let data = await blogObject.save();
    // console.log(data);
  }
});

describe('when there is initially some notes saved', () => {
  test('list all blogpost', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    console.log(response.body);
    // expect(response.body).toHaveLength(helper.initialBlogs.length);
    assert.equal(response.body.length, helper.initialBlogs.length);
  });

  test('4.9 Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id.', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).toBe(undefined);
  });
});

test('4.10 Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.', async () => {
  const newBlog = {
    title: 'how to learn node.js',
    author: 'dungkt',
    url: '#',
    likes: 200,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  // console.log(blogsAtEnd);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain('how to learn node.js');
});

test('4.11', async () => {
  const newBlog = {
    title: 'test',
    url: '#',
    author: 'me',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test('4.12', async () => {
  const newBlog = {
    author: 'me',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

describe('delete of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

test('test PUT method for /api/blogs/:id', async () => {
  let blogsAtStart = await helper.blogsInDb();
  let getFirstBlog = blogsAtStart[0];
  console.log(getFirstBlog);
  let editBlog = {
    likes: 10000,
  };

  await api
    .put(`/api/blogs/${getFirstBlog.id}`)
    .send(editBlog)
    .expect(200);
});

after(async () => {
  await mongoose.connection.close();
});
