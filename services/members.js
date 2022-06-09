const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)
const ApiError = require('../helpers/ApiError')
const { uploadImageToS3 } = require('./uploadImageToS3')
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
  createMember: async (req) => {
    try {
      const newMember = await Member.create(req.body)
      if (newMember) {
        if (req.file) {
          newMember.image = await uploadImageToS3(req)
          await newMember.save()
        }
      }
      return newMember
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.BAD_REQUEST, error.parent.code)
    }
  },
  deleteMember: async (id) => {
    const deletedMember = await Member.destroy({
      where: { id },
    })
    if (!deletedMember) throw new ApiError(httpStatus.NOT_FOUND, `Member with id ${id} not found`)
    return true
  },
}
