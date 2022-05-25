const db = require('../database/models')

const { Category } = db

const getCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id, { attributes: ['name'] })
    return category
  } catch (e) {
    throw new Error(e)
  }
}

const listCategories = async () => {
  try {
    const categories = await Category.findAll({ attributes: ['name'] })
    return categories
  } catch (e) {
    return e
  }
}

module.exports = {
  listCategories,
  getCategoryById,
}
