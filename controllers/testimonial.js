const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers/catchAsync')
const httpStatus = require('../helpers/httpStatus')
const { endpointResponse } = require('../helpers/success')
const { createTestimonial, deleteTestimonial } = require('../services/testimonial')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const { name, content, image } = req.body
      const response = await createTestimonial({ name, content, image })
      return endpointResponse({ res, ...response })
    } catch (error) {
      return next(createHttpError(500, error))
    }
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteTestimonial(id)
    return endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Testimonial deleted successfully',
    })
  }),
}
