const jwt = require('jsonwebtoken')
const { User } = require('../database/models')
const authConfig = require('../config/auth')

module.exports = {
  validateToken: (token) => (req, res, next) => {
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        res.status(403).json({ msg: 'Token not decoded' })
      } else {
        const user = await User.findByPk(decoded.user.idUser)
        req.user = user
        next()
      }
    })
  },
}
