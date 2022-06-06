const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { createTestimonial, updateTestimonial } = require('../services/testimonial')

module.exports = {
  post: async (req, res, next) => {
    try {
      const { name, content, image } = req.body
      const response = await createTestimonial({ name, content, image })
      return endpointResponse({ res, ...response })
    } catch (error) {
      return next(createHttpError(500, error))
    }
  },
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const { name, content, image } = req.body
    const updatedTestimonial = await updateTestimonial(
      {
        id,
        name,
        content,
        image,
      },
      req,
    )
    return endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Testimonial updated successfully',
      body: updatedTestimonial,
    })
  }),
}
