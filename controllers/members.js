const db = require('../database/models')

const { Members } = db

module.exports = {
  list: async (req, res) => {
    try {
      const members = await Members.findAll()
      return members.length !== 0
        ? res.status(200).json({ status: res.statusCode, data: members })
        : res.status(404).json({
          error: {
            status: res.statusCode,
            msg: 'Members not found',
          },
        })
    } catch (e) {
      return res.status(500).json({
        error: {
          status: res.statusCode,
          msg: e,
        },
      })
    }
  },
}
