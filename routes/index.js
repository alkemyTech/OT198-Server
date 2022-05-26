const express = require('express')
const { get } = require('../controllers/index')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const newsRouter = require('./news')
const organizationRouter = require('./organization')
const userRouter = require('./user')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/ping', pingRouter)

// categories routes
router.use('/categories', categoriesRouter)

router.use('/news', newsRouter)
// organization routes
router.use('/organization', organizationRouter)
// user routes
router.use('/auth', userRouter)

module.exports = router
