const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  try {
   
    const users = await User.find({}).populate(
      'blogs',
      {title: 1,
        author: 1,
        likes: 1
      })
    console.log(users)
    res.json(users.map(u => u.toJSON()))
  } catch (e) {
    res.status(400).json({
      error: e.message,
    })
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password || (body.password.length && body.password.length < 3)) {
    response.status(400).json({
      error: 'a password is required, and it must be a minimum of 3 characters long'
    })
  } else {
    try {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      })

      const savedUser = await user.save()

      response.json(savedUser.toJSON())
    } catch (e) {
      response.status(400).json({
        error: e.message
      })
    }
  }
})

module.exports = usersRouter
