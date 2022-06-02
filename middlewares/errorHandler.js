const ApiError = require('../helpers/ApiError')
const httpStatus = require('../utils/httpStatus')

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || 'Internal server error'
    error = new ApiError(statusCode, message, false)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
  }

  res.status(statusCode).send(response)
}

module.exports = {
  errorConverter,
  errorHandler,
}
