const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { getNewById } = require('../services/news')

const getNews = async (req, res, next) => {
  try {
    const { id } = req.Params
    if (id) {
      const result = await getNewById(id)
      if (!result) {
        next(createHttpError(404, 'New not found'))
      }
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: result,
      })
    }
  } catch (e) {
    const httpError = createHttpError(
      e.statusCode,
      `[Error retrieving index] - [index - GET]: ${e.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  getNews,
}
