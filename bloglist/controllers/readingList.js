const ReadingList = require('../models/readingList')
const { tokenExtractor, userExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const { blogId } = req.body
  const userId = req.user.id

  if (!blogId) {
    return res.status(400).json({ error: 'blogId is required' })
  }

  if (!req.user) {
    return res.status(401).json({ error: 'user not found' })
  }

  const readingList = await ReadingList.create({
    userId,
    blogId,
    read: false
  })
  res.json(readingList)
})

module.exports = router