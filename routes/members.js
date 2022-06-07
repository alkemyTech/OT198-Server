const express = require('express')

const router = new express.Router()
const { list } = require('../controllers/members')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

router.get('/', auth, isAdmin, list)

module.exports = router
