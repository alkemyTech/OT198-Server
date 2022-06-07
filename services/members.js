const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')
const db = require('../database/models')

const { Member } = db

module.exports = {
  listMembers: async () => {
    try {
      const allMembers = await Member.findAll()
      return allMembers
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.parent.code)
    }
  },
}
