const router = require('express').Router()
const validateCategory = require('../middlewares/validateCategory')
const validateErrors = require('../middlewares/validateErrors')

const { list, listCategory, post } = require('../controllers/categories')

// get a category by id
router.get('/:id', listCategory)

// get all categories
router.get('/', list)

// create a new category
router.post('/', validateCategory, validateErrors, post)

module.exports = router
