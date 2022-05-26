const router = require('express').Router()

const validateError = require('../middlewares/validateError')
const newSchemaValidator = require('../schemas/newSchema')
const { post } = require('../controllers/new')

router.post('/', newSchemaValidator, validateError, post)

module.exports = router
