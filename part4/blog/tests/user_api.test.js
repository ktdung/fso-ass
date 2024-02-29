const bcrypt = require('bcrypt');
const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const suppertest = require('supertest');
const User = require('../models/user.model');
const app = require('../app');
const helper = require('../tests/bloglist_helper');

const api = suppertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('1234', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});
describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'dungkt2',
      name: 'kieu dung 2',
      password: 'hihi',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtEnd.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('create fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'dungkt',
      name: 'kieu dung',
      password: '1234',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'expected `username` to be unique'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
