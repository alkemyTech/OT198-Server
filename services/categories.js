const db = require('../database/models')

const { Category } = db

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id)
  return category
}

module.exports = {
  getCategoryById,
}
