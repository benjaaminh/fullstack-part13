const blogsRouter= require('express').Router()
require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)


blogsRouter.get('/', async (request, response) => {
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    console.log(blogs)
  response.json(blogs)
})
 


module.exports= blogsRouter