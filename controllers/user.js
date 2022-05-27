const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { createUser, tryLogin } = require('../services/user')

module.exports = {
  post: async (req, res, next) => {
    try {
      const user = await createUser(req.body)
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'User created',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error posting new user] - [users - POST]: ${error.message}`,
      )
      next(httpError)
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body
    try {
      const {
        code, status, message, body,
      } = await tryLogin({ email, password })
      endpointResponse({
        res,
        code,
        status,
        message,
        body,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error logging in user] - [users - tryLogin]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
