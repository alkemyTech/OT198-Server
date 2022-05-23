const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const db = require('../database/models')

const { Users } = db

// find all testimonials function
const allUsers = async (req, res, next) => {
  try {
    const User = await Users.findAll()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: User,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error showing all testimonials: ${err.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  allUsers,
}
