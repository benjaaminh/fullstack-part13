const authorsRouter = require('express').Router()
const Blog = require('../models/blog')
const sequelize = require('sequelize')

authorsRouter.get('/', async (req, res) => {
    const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author']
    })
    res.json(authors)
})

module.exports = authorsRouter