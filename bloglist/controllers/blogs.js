const blogsRouter= require('express').Router()
require('dotenv').config()
const { Sequelize, QueryTypes, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER
  }
}, 
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})
Blog.sync()

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  try {
    const note = await Blog.create(req.body)
    return res.json(note)
  } catch(error) {
        console.error(error); // Log the error for debugging
    return res.status(400).json({ error })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      await blog.destroy()
      return res.status(204).end()
    } else {
      return res.status(404).json({ error: 'blog not found' })
    }
  } catch(error) {
    console.error(error)
    return res.status(400).json({ error })
  }
})
 


module.exports= blogsRouter