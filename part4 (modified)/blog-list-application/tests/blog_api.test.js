const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const initialBlogs = [
  {
    title: 'The ultimate search engine: SEO best practices',
    author: 'Vincent Battaglia',
    url: 'www.google.com',
    likes: 25,
    
  },
  {
    title: 'REACT is a great framework for creating single-page apps like Facebook',
    author: 'Lamar Williams',
    url: 'www.facebook.com',
    likes: 12,
  },
]

const initalUsers = [
  {
    name: 'Sally Smith',
    username: 'ssmith',
    passwordHash: 'password1234',
  },
  {
    name: 'John Jacobs',
    username: 'jjacobs',
    passwordHash: 'abcdefg12',
  },
]

beforeEach(async () => {
  await User.deleteMany({})

  const usersArray = initalUsers.map((user) => new User(user))
  const promiseArray = usersArray.map((user) => user.save())

  await Promise.all(promiseArray)
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  console.log(blogObject)

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  console.log(blogObject)
})

describe('when there are initially blog posts saved', () => {
  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('viewing a specific blog post', () => {
  test('blog contains an id', async () => {
    const response = await api.get('/api/blogs')

    console.log(response.body._id)
    expect(response.body._id).toBeDefined
  })

  test('succeeds with a valid id', async () => {})

  test('a new blog post is saved', async () => {
    const blogObject = new Blog({
      title: 'Here is a new blog post',
      author: 'Sally Smith',
      url: 'www.reddit.com',
      likes: 12,
    })

    await api.post('/api/blogs').send(blogObject)

    expect(Blog).toHaveLength(3)
  })

  test.only('likes property defaults to 0 when missing from request', async () => {
    const blogObject = new Blog({
      title: 'Why you should learn React',
      author: 'Shawn Blake',
      url: 'www.math.com',
    })

   const response = await api.post('/api/blogs').send(blogObject)

    expect(response.body.likes).toBe(0)
  })

  test('If title and url are missing, respond with status code 400', async () => {
    const blogObject = new Blog({
      author: 'Sally Smith',
      likes: 42,
    })

    const response = await api.post('/api/blogs').send(blogObject)
    expect(response.status).toBe(400)
  })

  test('If the likes count is changed, update the database with the changed amount', async () => {
    
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    const blogObject = ({
      title: 'REACT is a great framework for creating single-page apps like Facebook',
      author: 'Lamar Williams',
      url: 'www.facebook.com',
      likes: 20,
    })

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogObject)
      .expect(200)

    const blogsAtEnd = await blogsInDb()
    
    const updatedBlog = blogsAtEnd.map(b => b.likes)

    expect(updatedBlog).toContain(20)
  })
})

describe('deletion of a blog', () => {
  test('making a request with wrong id retuns 400', async () => {
    await api
      .delete('/api/blogs/1')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('deleting a post works correctly', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id

    const deletedBlog = await api.delete(`/api/blogs/${id}`)

    expect(deletedBlog.body).toEqual(blogs.body[0])

    const newBlogs = await api.get('/api/blogs')

    expect(newBlogs.body.length).toBe(blogs.body.length - 1)
  })
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'vbattaglia',
      name: 'Vincent Battaglia',
      password: 'battaglia',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('new user created', () => {
  test('is passing the requirements', async () => {
    const userToCreate = {
      name: 'John Locke',
      username: 'jlock',
      password: '012345678',
    }

    const createdUser = await api.post('/api/users').send(userToCreate)

    expect(createdUser.body.user).toBe(userToCreate.user)
    expect(createdUser.body.username).toBe(userToCreate.username)
  })

  test('if a username has less than 3 character, send a 400 error', async () => {
    const userWithShortUserName = {
      username: '12',
      password: '12345',
    }

    const apiResponse = await api
      .post('/api/users')
      .send(userWithShortUserName)

    expect(apiResponse.status).toBe(400)
    expect(apiResponse.body).toHaveProperty('error')
  })

  test('if password is 2 characters or less, send error', async () => {
    const incorrectPassword = {
      username: 'Sandy Smith',
      password: '01',
    }

    const res = await api.post('/api/users')
      .send(incorrectPassword)

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})


afterAll(() => {
  mongoose.connection.close()
})
