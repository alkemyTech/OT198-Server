const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { User } = require('../database/models')

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(403).json({ msg: 'Access not authorized.' })
    } else {
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if (err) {
          res.status(403).json({ msg: 'Token not decoded' })
        } else {
          const user = await User.findByPk(decoded.user.idUser)
          req.user = user
          next()
        }
      })
    }
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error decoding token] - [auth]: ${error.message}`,
    )
    next(httpError)
  }
}
