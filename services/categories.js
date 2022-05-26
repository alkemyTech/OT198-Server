const db = require('../database/models')

const { Category } = db
// todo - create a error handler
const listCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id, { attributes: ['name'] })
    if (!category) throw new Error(`Category id ${id} not found`)
    return category
  } catch (error) {
    throw new Error(error)
  }
}

const listCategories = async () => {
  try {
    const categories = await Category.findAll({ attributes: ['name'] })
    return categories
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listCategories,
  listCategoryById,
}
