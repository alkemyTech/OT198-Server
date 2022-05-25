const router = require('express').Router()

const { list, getCategory } = require('../controllers/categories')

// get a category by id
router.get('/:id', getCategory)

// get all categories
router.get('/', list)

module.exports = router
