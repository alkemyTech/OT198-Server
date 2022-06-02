const { endpointResponse } = require('../helpers/success')
const { createTestimonial } = require('../services/testimonial')
const { catchAsync } = require('../helpers/catchAsync')
const httpStatus = require('../utils/httpStatus')

module.exports = {
  post: catchAsync(async (req, res) => {
    const response = await createTestimonial(req.body)

    return endpointResponse({
      res,
      code: httpStatus.CREATED,
      message: 'Testimonial created successfully',
      body: response,
    })
  }),
}
