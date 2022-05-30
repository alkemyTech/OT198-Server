const createHttpError = require('http-errors')
const { validateToken } = require('./jwt')

module.exports = {
  auth: (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        res.status(403).json({ msg: 'Access not authorized.' })
      } else {
        const token = req.headers.authorization.split(' ')[1]
        validateToken(token)
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error decoding token] - [auth]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
