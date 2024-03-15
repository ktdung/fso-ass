import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

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

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setMessage({
      type: 'success',
      text: 'Logout successful.',
    });
    setUser(null);
  };

  const userInfo = () => (
    <div>
      {user.name} logged in{' '}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  return (
    <div>
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <h2>blogs</h2>
          {userInfo()}
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
