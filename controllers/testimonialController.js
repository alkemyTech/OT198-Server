const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const db = require('../database/models')

const { Testimonial } = db

// create testimonial function
const create = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body)
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: testimonial,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error creating testimonial: ${err.message}`,
    )
    next(httpError)
  }
}
// find all testimonials function
const showAll = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findAll()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: testimonials,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error showing all testimonials: ${err.message}`,
    )
    next(httpError)
  }
}
// find by id function
const findById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id)
    if (!testimonial) {
      const httpError = createHttpError(
        404,
        'testimonial Not Found',
      )
      next(httpError)
    } else {
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: testimonial,
      })
    }
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error trying to find testimonial by id: ${err.message}`,
    )
    next(httpError)
  }
}
// delete testimonial function
const destroy = async (req, res, next) => {
  try {
    const deletedRows = await Testimonial.destroy({ where: { id: req.params.id } })
    if (deletedRows === 0) next(createHttpError(404, 'Not Found'))

    endpointResponse({
      res,
      code: 204,
      status: true,
      message: 'deleted',
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error deleting testimonial: ${err.message}`,
    )
    next(httpError)
  }
}
// update testimonial function
const update = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id)
    if (!testimonial) next(createHttpError(404, 'Not Found'))
    await testimonial.update(
      req.body,
    )
    await testimonial.save()
    endpointResponse({
      res, code: 200, status: true, message: testimonial,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error updating testimonial: ${err.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  create,
  showAll,
  findById,
  destroy,
  update,
}
