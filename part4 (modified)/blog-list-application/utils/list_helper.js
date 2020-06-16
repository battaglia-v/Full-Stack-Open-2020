const dummy = blogs => {
  const result = 1 
  return result 
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = blogs => {
  const blog = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }, 0)
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = blogs => {
  const authorArray = {}
  let mostBlogsValue = 0
  let authorWithMostBlogs = null

  if (!blogs.length) return null

  blogs.forEach(blog => {
    if (authorArray.hasOwnProperty(blog.author)) {
      authorArray[blog.author]++
    } else {
      authorArray[blog.author] = 1
    }
  })

  for (author of Object.keys(authorArray)) {
    if (authorArray[author] > mostBlogsValue) {
      authorWithMostBlogs = author
      mostBlogsValue = authorArray[author]
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: mostBlogsValue
  }
}

const mostLikes = (blogs) => blogs
  .reduce(({sums,most}, {likes, author}) => {
    sums[author] = likes = (sums[author] || 0) + likes
    if (likes > most.likes) most = {author,likes}
    return {sums,most}
  }, {sums: {}, most: {likes:0} })
  .most

        
     

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
