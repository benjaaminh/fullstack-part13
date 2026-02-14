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

const readingListFinder = async (req, res, next) => {
  req.readingList = await ReadingList.findByPk(req.params.id)
  next()
}

router.put('/:id', tokenExtractor, userExtractor, readingListFinder, async (req, res) => {
  if (req.readingList) {
    if (req.readingList.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only modify your own reading list' })
    }
    req.readingList.read = req.body.read;
    await req.readingList.save()
    res.json(req.readingList)
  } else {
    res.status(404).json({ error: 'Reading list not found' })
  }
})

module.exports = router