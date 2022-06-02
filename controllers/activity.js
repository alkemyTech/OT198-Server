const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')

const { listActivity, postActivity, updateActivity } = require('../services/activity')

module.exports = {
  list: async (req, res, next) => {
    try {
      const response = await listActivity()
      endpointResponse({
        res,
        ...response,
      })
    } catch (err) {
      const httpError = createHttpError(
        err.statusCode,
        `Error showing all activities: ${err.message}`,
      )
      next(httpError)
    }
  },
  post: async (req, res, next) => {
    try {
      const { name, image, content } = req.body
      const newActivity = await postActivity({ name, image, content })
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Activity created',
        body: newActivity,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error with database] - [create Activity - POST]: ${error.message}`,
      )
      next(httpError)
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params
    try {
      const { name, image, content } = req.body
      const response = await updateActivity({ name, image, content }, id)
      endpointResponse({
        res,
        ...response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error with database] - [create Activity - POST]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
