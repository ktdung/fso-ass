import React from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [likes, setLikes] = React.useState('');

  const handleCreateBlog = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };

  return (
    <div>
      <h3>Create New</h3>

      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div>
          Url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
