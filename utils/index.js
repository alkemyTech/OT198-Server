const {
  notFound,
  databaseError,
  badRequest,
  internalServerError,
  forbidden,
  unauthorized,
} = require('./errors')
const { checkUndefined } = require('./utils')
const { ok, created } = require('./success')

module.exports = {
  notFound,
  databaseError,
  badRequest,
  checkUndefined,
  ok,
  internalServerError,
  forbidden,
  unauthorized,
  created,
}
