const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getCategoryById } = require('../services/categories')

const db = require('../database/models')

const { Category } = db

const getCategory = async (req, res, next) => {
  const { id } = req.params
  const category = await getCategoryById(id)
  if (!category) {
    return next(createHttpError(404, 'Category not found'))
  }
  return endpointResponse({
    res,
    code: 200,
    status: true,
    message: 'Category found!',
    body: category,
  })
}

module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const categories = await Category.findAll()
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: categories,
      })
    } catch (e) {
      const httpError = createHttpError(
        e.statusCode,
        `[Error retrieving index] - [index - GET]: ${e.message}`,
      )
      next(httpError)
    }
  }),
  getCategory,
}
