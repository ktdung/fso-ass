const dummy = require('../utils/list_helper').dummy;

const { test, describe } = require('node:test');
const assert = require('node:assert');

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  // expect(result).toBe(1);
  assert.strictEqual(result, 1);
});
