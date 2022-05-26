const router = require('express').Router()
const { body } = require('express-validator')

const { list, listCategory, create } = require('../controllers/categories')

// get a category by id
router.get('/:id', listCategory)

// get all categories
router.get('/', list)

// create a new category
router.post('/', body('name').isString().notEmpty().trim(), create)

module.exports = router
