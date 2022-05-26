const router = require('express').Router()

const { post } = require('../controllers/user')

// register new user
router.post('/', post)

module.exports = router
