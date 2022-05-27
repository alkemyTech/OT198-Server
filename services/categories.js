const db = require('../database/models')
const { checkUndefined, databaseError, created } = require('../utils')

const { Category } = db
// todo - create a error handler
const listCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id)
    return checkUndefined(category)
  } catch (error) {
    return databaseError(error)
  }
}

const listCategories = async () => {
  try {
    const categories = await Category.findAll({ attributes: ['name'] })
    return checkUndefined(categories, 'No categories found')
  } catch (error) {
    return databaseError(error)
  }
}

const createCategory = async (category) => {
  try {
    const newCategory = await Category.create(category)
    return created(newCategory)
  } catch (error) {
    return databaseError(error)
  }
}

module.exports = {
  listCategories,
  listCategoryById,
  createCategory,
}
