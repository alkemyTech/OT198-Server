const router = require('express').Router()
const { list } = require('../controllers/comments')

router.get('/', list)

module.exports = router
