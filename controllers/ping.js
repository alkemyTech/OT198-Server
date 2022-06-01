const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
/* const s3Service = require('../services/s3Service') */

module.exports = {
  pong: async (req, res, next) => {
    try {
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'PONG',
        body: req.file,
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
