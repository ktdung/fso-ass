import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogFrom from './BlogForm';

describe('<BlogForm />', () => {
  test('create new blog', async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    const container = render(
      <BlogFrom createBlog={createBlog} />
    ).container;

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');
    const submitCreateBlogBtn = container.querySelector('#submitBtn');

    await user.type(titleInput, 'how to using Macbook Pro');
    await user.type(authorInput, 'Tim Cook');
    await user.type(urlInput, 'apple.com');

    await user.click(submitCreateBlogBtn);

    // screen.debug();
    expect(createBlog.mock.calls).toHaveLength(1);
    // console.log(createBlog.mock.calls);
    expect(createBlog.mock.calls[0][0].title).toBe(
      'how to using Macbook Pro'
    );
    expect(createBlog.mock.calls[0][0].author).toBe('Tim Cook');
    expect(createBlog.mock.calls[0][0].url).toBe('apple.com');
  });
});
