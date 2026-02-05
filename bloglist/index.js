const app = require('./app') // the actual Express application
const config = require('./util/config')
const logger = require('./util/logger')
const Blog = require('./models/blog')
const User = require('./models/user')

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.sync({ alter: true })
User.sync({ alter: true })

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = {
  Blog
}