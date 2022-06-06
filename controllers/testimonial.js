const { catchAsync } = require('../helpers/catchAsync')
const httpStatus = require('../helpers/httpStatus')
const { endpointResponse } = require('../helpers/success')
const { createTestimonial, deleteTestimonial } = require('../services/testimonial')

module.exports = {
  post: catchAsync(async (req, res) => {
    const testimonialCreated = await createTestimonial(req)
    return endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Testimonial created successfully',
      body: testimonialCreated,
    })
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
