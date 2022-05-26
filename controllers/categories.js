const createHttpError = require('http-errors')
const { validationResult } = require('express-validator')
const { endpointResponse } = require('../helpers/success')
const { listCategories, listCategoryById, createCategory } = require('../services/categories')

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
    if (!category) throw next(createHttpError(404, `Category with id ${id} not found`))
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Category found',
      body: category,
    })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  if (validationResult(req).isEmpty()) {
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
      next(error)
    }
  } else {
    const error = validationResult(req).mapped()
    const httpError = createHttpError(
      400,
      `Invalid request body, param name ${error.name.value ? error.name.msg : 'is missing'}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
  listCategory,
  create,
}
