const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((totalLikes, blog) => {
        return totalLikes + blog.likes;
      }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((first_blog, blog) => {
        return first_blog.likes >= blog.likes ? first_blog : blog;
      });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
