import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [show, setShow] = React.useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleShowBlog = (event) => {
    setShow(!show);
  };
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}{' '}
        <button onClick={handleShowBlog}>
          {show ? 'hide' : 'view'}
        </button>
      </p>
      <div style={{ display: show ? '' : 'none' }}>
        <p>
          <a href={`${blog.url}`}>{blog.url}</a>
        </p>
        <p>
          likes {blog.likes}{' '}
          <button onClick={() => likeBlog(blog.id, blog.likes)}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
};

export default Blog;
