const router = require('express').Router()

const { list, getCategory } = require('../controllers/categories')

// get all categories
router.get('/', list)

// get a category by id
router.get('/:id', getCategory)

module.exports = router
