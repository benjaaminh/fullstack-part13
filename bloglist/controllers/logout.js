const router = require('express').Router()

const Session = require('../models/session')
const { tokenExtractor, userExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, userExtractor, async (request, response) => {
  await Session.update(
    { valid: false },
    { where: { id: request.decodedToken.sessionId } }
  )
  return response.status(204).end()
})

module.exports = router
