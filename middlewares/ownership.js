const ApiError = require('../helpers/ApiError')
const { decodeToken } = require('../services/jwt')
const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  ownershipValidate: catchAsync(async (req, res, next) => {
    const user = await decodeToken(req)
    if (user.roleId === 1 || user.id === +req.params.id) {
      next()
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to do this')
    }
  }),
}
