const db = require('../database/models')

const { User } = db

const createUser = async (name, surname, email, password) => {
  try {
    const newUser = await User.create({
      name, surname, email, password,
    })
    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createUser,
}
