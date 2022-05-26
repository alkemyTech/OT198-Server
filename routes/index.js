const express = require('express')
const { get } = require('../controllers/index')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const newsRouter = require('./news')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/ping', pingRouter)
router.use('/categories', categoriesRouter)

router.use('/news/:id', newsRouter)

module.exports = router
