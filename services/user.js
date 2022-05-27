const db = require('../database/models')

const { User } = db

const createUser = async (firstName, lastName, email, password) => {
  try {
    const user = await User.create({
      firstName, lastName, email, password,
    })
    return user
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createUser,
}
