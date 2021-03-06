const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)
const ApiError = require('../helpers/ApiError')
const { uploadImageToS3 } = require('./uploadImageToS3')
const httpStatus = require('../helpers/httpStatus')
const db = require('../database/models')

const { Member } = db

module.exports = {
  listMembers: async (page) => {
    const allMembers = await Member.findAndCountAll({
      limit: 10,
      offset: 10 * (page - 1),
      order: [['createdAt', 'DESC']],
    })
    return allMembers
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
    if (!deletedMember) throw new ApiError(httpStatus.NOT_FOUND, 'Member not found')
    return true
  },
  updateMember: async (req, id) => {
    try {
      const editMember = await Member.update(req.body, {
        where: { id },
      })
      if (editMember[0] !== 1) throw new Error(`Member ${id} not found`)
      const memberUpdated = await Member.findByPk(id)
      if (req.file) {
        memberUpdated.image = await uploadImageToS3(req)
        await memberUpdated.save()
      }
      return memberUpdated
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.NOT_FOUND, error.message)
    }
  },
}
