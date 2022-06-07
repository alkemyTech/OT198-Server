const { body } = require('express-validator')

const memberSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
]

module.exports = memberSchema
