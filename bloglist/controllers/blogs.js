const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const note = await Blog.create(req.body)
  res.status(201).json(note)
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