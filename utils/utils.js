const { notFound } = require('./errors')
const { ok } = require('./success')

module.exports = {
  checkUndefined: (obj, errMessage) => {
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return notFound(errMessage)
      }
      return ok(obj)
    }
    if (!obj) return notFound(errMessage)
    return ok(obj)
  },
}
