const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
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

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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

  
    expect(response.body._id).toBeDefined
  })


  test('a new blog post is saved', async () => {
    const blogObject = new Blog({
      title: 'Here is a new blog post',
      author: 'Sally Smith',
      url: 'www.reddit.com',
      likes: 12,
    })

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbm55IiwiaWQiOiI1ZWU3YWRhMjJlOTRiZTEzZDhiMmQ4ODIiLCJpYXQiOjE1OTIzNTYzNDJ9.uEIHj1TsngBIKuZlRA25_ijf9yU0QYy61BKs0cCtmio')
      .send(blogObject)

    expect(Blog).toHaveLength(3)
  })

  test('likes property defaults to 0 when missing from request', async () => {
    const blogObject = new Blog ({
      title: 'Here is a new blog post',
      author: 'Sally Smith',
      url: 'www.reddit.com',
    })
    
    const response = await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbm55IiwiaWQiOiI1ZWU3YWRhMjJlOTRiZTEzZDhiMmQ4ODIiLCJpYXQiOjE1OTIzNTYzNDJ9.uEIHj1TsngBIKuZlRA25_ijf9yU0QYy61BKs0cCtmio'
      )
      .set('Content-Type', 'application/json')
      .send(blogObject)
    
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
})

test('If the likes count is changed, update the database with the changed amount', async () => {
    
  const blogs = await blogsInDb()
  const blogToReplace = blogs[0]
  const newLikes = { ...blogToReplace, likes: 9999 }

  await api
    .put(`/api/blogs/${blogToReplace.id}`)
    .set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbm55IiwiaWQiOiI1ZWU3YWRhMjJlOTRiZTEzZDhiMmQ4ODIiLCJpYXQiOjE1OTIzNTYzNDJ9.uEIHj1TsngBIKuZlRA25_ijf9yU0QYy61BKs0cCtmio'
    )
    .send(newLikes)
    .expect(200)

  const blogsAtEnd = await blogsInDb()
  const replacedBlog = blogsAtEnd.filter((b) => b.id === blogToReplace.id)[0]
  expect(replacedBlog.likes).toBe(newLikes.likes)
     
})



describe('deletion of a blog', () => {
  test('succeeds with status code 204 if the ID is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
      
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()


    expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
    
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