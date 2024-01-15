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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    // Sử dụng Lodash để nhóm theo tác giả và tính tổng số likes
    const authorLikesCounts = _.groupBy(blogs, 'author');
    const authorTotalLikes = _.mapValues(
      authorLikesCounts,
      (authorPosts) => _.sumBy(authorPosts, 'likes')
    );

    // Tìm tác giả có số likes nhiều nhất
    const mostLikedAuthor = _.maxBy(
      _.keys(authorTotalLikes),
      (author) => authorTotalLikes[author]
    );

    return {
      author: mostLikedAuthor,
      likes: authorTotalLikes[mostLikedAuthor],
    };
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
