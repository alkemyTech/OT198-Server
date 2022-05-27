const bcrypt = require('bcrypt')
const db = require('../database/models')

const { User } = db

const createUser = async (data) => {
  const {
    firstName, lastName, email, password,
  } = data
  try {
    const user = await User.create({
      firstName, lastName, email, password: bcrypt.hashSync(password, 12),
    })
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const deleteUser = async (id) => {
  try {
    const user = await User.destroy({
      where: { id },
    })
    return user === 1 ? { code: 200, status: true, message: 'User deleted' } : { code: 400, status: false, message: `User ${id} not found` }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createUser,
  deleteUser,
}
