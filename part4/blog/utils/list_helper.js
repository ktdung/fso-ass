const _ = require('lodash');

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    let emptyObj = {};
    return emptyObj;
  } else {
    // Sử dụng Lodash để nhóm theo tác giả và đếm số lượng bài viết
    const authorPostCounts = _.countBy(blogs, 'author');

    // Tìm tác giả có nhiều bài viết nhất
    const mostProlificAuthor = _.maxBy(
      _.keys(authorPostCounts),
      (author) => authorPostCounts[author]
    );

    let mostBlog = {
      author: `${mostProlificAuthor}`,
      blogs: authorPostCounts[mostProlificAuthor],
    };

    return mostBlog;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
