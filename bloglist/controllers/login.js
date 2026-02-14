const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(403).json({
      error: 'account disabled'
    })
  }

  const session = await Session.create({
    userId: user.id,
    valid: true
  })

  const userForToken = {
    username: user.username,
    id: user.id,
    sessionId: session.id
  }

  const token = jwt.sign(userForToken, SECRET)
  
  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = router