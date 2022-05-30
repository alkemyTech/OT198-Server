const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { listCategories, listCategoryById, createCategory } = require('../services/categories')

const list = async (req, res, next) => {
  try {
    const categories = await listCategories()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Categories found',
      body: categories,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [categories - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

const listCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await listCategoryById(id)
    endpointResponse({
      res,
      ...response,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [listCategory with ID - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

const post = async (req, res, next) => {
  try {
    const { name, description, image } = req.body
    const category = await createCategory({ name, description, image })
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'Category created',
      body: category,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [create Category - POST]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
  listCategory,
  post,
}
