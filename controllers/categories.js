const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { listCategories, getCategoryById } = require('../services/categories')

const list = async (req, res, next) => {
  try {
    const categories = await listCategories()
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
}

const getCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await getCategoryById(id)
    if (!category) {
      next(createHttpError(404, 'Category not found'))
    }
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Category found!',
      body: category,
    })
  } catch (e) {
    const httpError = createHttpError(
      e.statusCode,
      `[Error retrieving category] - [category - GET]: ${e.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
  getCategory,
}
