import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog /> component', () => {
  let blog;

  test('renders title and author', () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 },
    };

    const container = render(
      <Blog blog={blog} user={blog.user} />
    ).container;

    // expect(container).toHaveTextContent('Test Blog');
    // expect(container).toHaveTextContent('Test Author');
    // expect(container).not.toHaveTextContent('http://example.com');
    // expect(container).not.toHaveTextContent('0');

    const element = screen.getByText('Test Blog');
    const element2 = screen.getByText('Test Author');
    const element3 = screen.queryByText('http://example.com');
    const element4 = screen.queryByText('likes 0');

    expect(element).toBeDefined();
    expect(element2).toBeDefined();
    expect(element3).toBeNull();
    expect(element4).toBeNull();

    console.log(element);
    console.log(element4);
  });

  test('5.14 check blog url and likes are shown when button has been cliked', async () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 },
    };

    const container = render(
      <Blog blog={blog} user={blog.user} />
    ).container;

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const element3 = container.querySelector('.blog-url');
    const element4 = container.querySelector('.blog-like');

    expect(element3).toBeDefined();
    expect(element4).toBeDefined();
  });

  test('5.15 check like button is clicked twice', async () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 },
    };
    const likeBlog = vi.fn();

    const container = render(
      <Blog blog={blog} user={blog.user} likeBlog={likeBlog} />
    ).container;

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const likeBtn = container.querySelector('.like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(likeBlog.mock.calls).toHaveLength(2);
    console.log(likeBlog.mock.calls);
  });
});
