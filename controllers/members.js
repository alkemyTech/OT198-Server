const httpStatus = require('../helpers/httpStatus')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { listMembers } = require('../services/members')

module.exports = {
  list: catchAsync(async (req, res) => {
    const members = await listMembers()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Members successfully retrieved',
      body: members,
    })
  }),
}
