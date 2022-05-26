const db = require('../database/models')

const { New } = db

exports.createNew = async (body) => {
  try {
    const newCategory = await New.create(body)
    return newCategory
  } catch (error) {
    throw new Error(error)
  }
}
