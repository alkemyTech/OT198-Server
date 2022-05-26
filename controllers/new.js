const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createNew } = require('../services/new')

const { New } = require('../database/models')

const getNews = async (req, res, next) => {
  try {
    const allNews = await New.findAll()
    res.send(allNews)
  } catch (error) {
    next(error)
  }
}

const post = catchAsync(async (req, res, next) => {
  try {
    const createdNew = await createNew(req.body)
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'New created',
      body: createdNew,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [create New - POST]: ${error.message}`,
    )
    next(httpError)
  }
})

module.exports = {
  getNews,
  post,
}
