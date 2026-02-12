const app = require('./app') // the actual Express application
const config = require('./util/config')
const logger = require('./util/logger')
const { connectToDatabase } = require('./util/db')
const Blog = require('./models/blog')
const User = require('./models/user')
const ReadingList = require('./models/readingList')

User.hasMany(Blog)
Blog.belongsTo(User)
User.belongsToMany(Blog, { through: ReadingList, as:'readings'})
Blog.belongsToMany(User, { through: ReadingList})
const start = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

start()

module.exports = {
  Blog
}