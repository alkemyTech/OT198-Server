const db = require('../database/models')

const { Slide } = db

const listSlide = async () => {
  try {
    const slides = await Slide.findAll({
      where: {
        order: [
          ['order', 'ASC'],
        ],
        attributes: ['imgeURL'],
      },
    })
    return slides
  } catch (error) {
    return (error)
  }
}

module.exports = {
  listSlide,
}
