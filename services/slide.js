const db = require('../database/models')

const { Slide } = db

const listSlide = async () => {
  try {
    return await Slide.findAll({ attributes: ['imageURL', 'order'] })
  } catch (error) {
    throw new Error(error)
  }
}

const listSlideByOrder = async () => {
  try {
    return await Slide.findAll({ order: [['order', 'ASC']] })
  } catch (error) {
    throw new Error(error)
  }
}

const listSlideById = async (id) => {
  try {
    const slide = await Slide.findByPk(id)
    return slide
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listSlide,
  listSlideByOrder,
  listSlideById,
}
