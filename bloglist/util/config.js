require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const SECRET = process.env.SECRET
  
module.exports = {
  PORT,
  DATABASE_URL,
  SECRET
}