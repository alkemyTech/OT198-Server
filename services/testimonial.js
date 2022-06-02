const { Testimonial } = require('../database/models')

module.exports = {
  createTestimonial: async (testimonialToCreate) => {
    const newTestimonial = await Testimonial.create(testimonialToCreate)

    return newTestimonial
  },
}
