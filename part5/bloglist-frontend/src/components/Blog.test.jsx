import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
    screen.debug();
  });
});
