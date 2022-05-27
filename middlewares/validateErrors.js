const { validationResult } = require('express-validator')
const { endpointResponse } = require('../helpers/success')
const { badRequest } = require('../utils')

module.exports = {
  validateSchema: (schema) => async (req, res, next) => {
    await Promise.all(schema.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return endpointResponse({ res, ...badRequest(errors) })
    }
    return next()
  },
}
