const express = require('express')

const router = new express.Router()

const validateError = require('../middlewares/validateError')
const newSchemaValidator = require('../schemas/newSchema')
const { post } = require('../controllers/news')
const { listNews } = require('../controllers/news')

router.get('/:id', listNews)
router.post('/', newSchemaValidator, validateError, post)

module.exports = router
