const { Testimonial } = require('../database/models')
const ApiError = require('../helpers/ApiError')
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
   * Delete a testimonial
   *
   * @param {number} idTestimonial the id of the testimonial to delete
   */
  deleteTestimonial: async (idTestimonial) => {
    const deleted = await Testimonial.destroy({ where: { id: idTestimonial } })
    if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found')
  },
}
