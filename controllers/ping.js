const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')

module.exports = {
  pong: async (req, res, next) => {
    try {
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'PONG',
        body: { fileLocation: req.file ? req.file.location : null },
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
