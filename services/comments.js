const { Comment } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listComments: async () => {
    try {
      const comments = await Comment.findAll({
        attributes: ['body'],
        order: [['createdAt', 'DESC']],
      })
      return comments
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.parent.code)
    }
  },
  createComments: async (body) => {
    try {
      const comment = await Comment.create(body)
      return comment
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.parent.code)
    }
  },
}
