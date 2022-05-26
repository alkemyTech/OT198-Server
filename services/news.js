const db = require('../database/models')

const { Category } = db

const getNewById = async () => {
  try {
    const categories = await Category.findAll({ attributes: ['name'] })
    return categories
  } catch (err) {
    return err
  }
}

module.exports = {
  getNewById,
}
