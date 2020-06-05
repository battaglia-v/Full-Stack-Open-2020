const http = require('http')
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')


// eslint-disable-next-line no-undef
const mongoUrl = process.env.MONGODB_URI

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)



app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  })

  console.log(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(console.error())
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})