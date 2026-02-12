const router = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const ReadingList = require('../models/readingList')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    await user.save();
    res.json(user);
  } else {
    res.status(404).end()
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },

    include: {
      model: Blog,
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },

      as: 'readings',
      through: {
        attributes: []
      }
    }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router