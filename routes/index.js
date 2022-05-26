const express = require('express')
const { get } = require('../controllers/index')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const organizationRouter = require('./organization')
const newRouter = require('./new')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/ping', pingRouter)

// categories routes
router.use('/categories', categoriesRouter)

// organization routes
router.use('/organization', organizationRouter)

// new routes
router.use('/new', newRouter)

module.exports = router
