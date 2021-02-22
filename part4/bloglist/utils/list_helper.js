const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes
      ? favorite
      : { title: blog.title, author: blog.author, likes: blog.likes }
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const authorMostBlogs = _.chain(blogs)
    .map('author')
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()
    
  return { author: authorMostBlogs[0], blogs: authorMostBlogs[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}