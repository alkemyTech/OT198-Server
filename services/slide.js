const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)
const { Slide } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const { uploadImageToS3 } = require('./uploadImageToS3')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listSlide: async () => {
    try {
      return await Slide.findAll({ attributes: ['imageURL', 'order'] })
    } catch (error) {
      throw new Error(error)
    }
  },
  listSlideById: async (id) => {
    try {
      const slide = await Slide.findByPk(id)
      return slide
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * Service to update slide
   *
   * @param {number} id the id of the slide to update
   * @param {object} body the body of the request that contains the new data of the slide
   * @param {object} req the request object that contains the image
   * @return {object} the updated slide object or an error
   */
  updateSlide: async (id, data, req) => {
    const slide = await Slide.findByPk(id)
    if (!slide) {
      if (data.imageURL) await unlinkFile(req.file.path)
      throw new ApiError(httpStatus.NOT_FOUND, `Slide with id ${id} not found`)
    }
    if (!data.imageURL) {
      data.imageURL = slide.imageURL
    } else {
      try {
        data.imageURL = await uploadImageToS3(req)
      } catch (error) {
        await slide.update(data)
        throw new ApiError(
          httpStatus.PARTIAL_CONTENT,
          'slide content updated but there is a error uploading image',
        )
      }
    }

    const updatedSlide = await slide.update(data)
    return updatedSlide.dataValues
  },
}
