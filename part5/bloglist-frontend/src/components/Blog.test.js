import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  let blog;

  test('renders title and author', () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 },
    };

    const component = render(<Blog blog={blog} user={blog.user} />);

    expect(component.container).toHaveTextContent('Test Blog');
    expect(component.container).toHaveTextContent('Test Author');
    expect(component.container).not.toHaveTextContent(
      'http://example.com'
    );
    expect(component.container).not.toHaveTextContent('0');
  });
});
