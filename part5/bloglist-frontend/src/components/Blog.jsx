import React from 'react';

const Blog = ({ blog }) => {
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
          likes {blog.likes} <button>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
