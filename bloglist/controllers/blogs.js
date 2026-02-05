const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
    res.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
  res.status(201).json(blog)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}


blogsRouter.delete('/:id', blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy()
      return res.status(204).end()
    } else {
      return res.status(404).json({ error: 'blog not found' })
    }
  } catch(error) {
    console.error(error)
    return res.status(400).json({ error })
  }
})
 
blogsRouter.put('/:id', blogFinder, async (request, response) => {
  if (request.blog) {
    request.blog.likes = request.body.likes
    await request.blog.save()
    response.json(request.blog)
  } else {
    response.status(404).json({ error: 'blog not found' })
  }
})
 

module.exports = blogsRouter