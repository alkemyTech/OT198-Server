const { Comment } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listComments: async () => {
    const comments = await Comment.findAll()
    if (comments.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No comments found')
    }
    return comments
  },
}
