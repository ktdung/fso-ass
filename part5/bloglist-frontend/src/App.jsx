import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    );

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      // console.log(user);
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      );

      setUser(user);
      setUsername('');
      setPassword('');
      setMessage({
        type: 'success',
        text: `${user.name} logged in`,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Wrong username or password. Please try again.',
      });
    }
  };

  const loginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) =>
            setUsername(target.value)
          }
          handlePasswordChange={({ target }) =>
            setPassword(target.value)
          }
        />
      </>
    );
  };

  // logout
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setMessage({
      type: 'success',
      text: 'Logout successful.',
    });
    setUser(null);
  };

  // create a blog
  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      setMessage({
        text: `A new blog ${response.title} by ${response.author} added.`,
        type: 'success',
      });
    } catch (error) {
      setMessage({
        text: `${error}`,
        type: 'error',
      });
    }
  };

  // Like Blog
  const likeBlog = async (id, likes) => {
    await blogService.update({ id: id, likes: likes + 1 });
  };

  const userInfo = () => (
    <div>
      {user.name} logged in{' '}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  return (
    <div>
      <Notification message={message} />

      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <h2>blogs</h2>
          {userInfo()}
          <br />

          <Toggleable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
