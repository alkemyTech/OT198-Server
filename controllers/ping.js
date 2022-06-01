const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { s3Service } = require('../services/s3Service')

module.exports = {
  pong: async (req, res, next) => {
    try {
      const data = await s3Service()
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'PONG',
        body: data,
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
