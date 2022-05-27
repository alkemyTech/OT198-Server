const { endpointResponse } = require('../helpers/success')
const { listCategories, listCategoryById, createCategory } = require('../services/categories')

const list = async (req, res, next) => {
  try {
    const response = await listCategories()
    endpointResponse({
      res,
      ...response,
    })
  } catch (error) {
    next(error)
  }
}

const listCategory = async (req, res, next) => {
  try {
    const response = await listCategoryById(req.params.id)
    endpointResponse({
      res,
      ...response,
    })
  } catch (error) {
    next(error)
  }
}

const post = async (req, res, next) => {
  try {
    const { name, description, image } = req.body
    const response = await createCategory({ name, description, image })
    endpointResponse({
      res,
      ...response,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  list,
  listCategory,
  post,
}
