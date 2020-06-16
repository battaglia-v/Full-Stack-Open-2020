const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.url || !body.title) {
    response.status(400).json({
      error: 'please enter a url and title, as both are required'
    })
  } else {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        response.status(401).json({ error: 'token missing or invalid' })
      }

      const user = await User.findById(decodedToken.id)
      console.log(user)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })

      const savedBlog = await blog.save()
      console.log(savedBlog)
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
   
      response.status(201).json(savedBlog.toJSON())
    } 
    catch (e) {
      response.status(401).json({ error: e.message })
    }
  }
})



      

blogsRouter.delete('/:id', async (request, response) => {

  const userId = request.params.id
  try {
    const blogToDelete = await Blog.findById(userId)

    if (!blogToDelete) {
      response.status(400).json({
        error: 'This blog post either does not exist, or it has been already deleted'
      })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id || (decodedToken.id !== blogToDelete.user.toString())) {
      response.status(401).json({ error: 'token missing or not authorized' })
    } else {
      const deleted = await Blog.findByIdAndDelete(userId)
      response.json(deleted.toJSON())
    }
  } catch (e) {
    response.status(400).json({
      error: e.message
    })
  }
})


blogsRouter.put('/:id', async (request, response) => {
    
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const updatedBlog = await 
  Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true }
  )
  response.json(updatedBlog.toJSON())

})

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
//     .catch(e => {
//       if (e.name === 'ValidationError') {
//         return response.status(400).json({ error: e.message })
// }
//     })

 
module.exports = blogsRouter