const router = require('express').Router()
const { getCategory } = require('../controllers/categories')

router.get('/:id', getCategory)

module.exports = router
