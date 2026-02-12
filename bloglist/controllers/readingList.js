const ReadingList = require('../models/readingList')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  if (!blogId || !userId) {
    return res.status(400).json({ error: 'blogId and userId are required' })
  }

  const readingList = await ReadingList.create({
    userId,
    blogId,
    read: false
  })
  res.json(readingList)
})

module.exports = router