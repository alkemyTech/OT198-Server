const util = require('util')
const fs = require('fs')
const { Testimonial } = require('../database/models')

const unlinkFile = util.promisify(fs.unlink)

const ApiError = require('../helpers/ApiError')
const { uploadImageToS3 } = require('./uploadImageToS3')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  createTestimonial: async (testimonialToCreate) => {
    try {
      const newTestimonial = await Testimonial.create(testimonialToCreate)
      return newTestimonial
        ? {
          code: 201,
          status: true,
          message: 'Testimonial created successfully',
          body: newTestimonial,
        }
        : { code: 400, status: true, message: 'Testimonial not created' }
    } catch (error) {
      throw new Error(error)
    }
  },
  /**
   * Update a testimonial
   *
   * @param {object} testimonialToUpdate the testimonial to update in the
   * database with the new values
   * @param {request} req the request object from the client to upload the image
   * @return {object} the testimonial updated or an error
   */
  updateTestimonial: async (testimonialToUpdate, req) => {
    const { id } = testimonialToUpdate
    const testimonial = await Testimonial.findByPk(id)
    if (!testimonial) {
      if (testimonialToUpdate.image) await unlinkFile(req.file.path)
      throw new ApiError(httpStatus.NOT_FOUND, `Testimonial with id ${id} not found`)
    }
    if (!testimonialToUpdate.image) {
      testimonialToUpdate.image = testimonial.image
    } else {
      try {
        testimonialToUpdate.image = await uploadImageToS3(req)
      } catch (error) {
        await testimonial.update(testimonialToUpdate)
        if (testimonialToUpdate.image) await unlinkFile(req.file.path)
        throw new ApiError(
          httpStatus.PARTIAL_CONTENT,
          'Testimonial content updated but there is a error uploading image',
        )
      }
    }

    const updatedTestimonial = await testimonial.update(testimonialToUpdate)
    return updatedTestimonial.dataValues
  },
}
