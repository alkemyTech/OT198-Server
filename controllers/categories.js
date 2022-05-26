const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { listCategories, listCategoryById } = require('../services/categories')

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

const listCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await listCategoryById(id)
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Category found!',
      body: category,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving category] - [category - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
  listCategory,
}
