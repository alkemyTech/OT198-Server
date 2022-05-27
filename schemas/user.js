const { body } = require('express-validator')

const userSchema = [
  body('firstName')
    .trim()
    .isString()
    .withMessage('firstName has to be a string')
    .notEmpty()
    .withMessage('firstName is required'),
  body('lastName')
    .trim()
    .isString()
    .withMessage('lastName has to be a string')
    .notEmpty()
    .withMessage('lastName is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('enter a valid email'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('password must have at least 8 characters')]

module.exports = userSchema
