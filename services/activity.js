const { Activity } = require('../database/models')

module.exports = {
  listActivity: async () => {
    try {
      const activities = await Activity.findAll()
      return activities
    } catch (error) {
      throw new Error(error)
    }
  },
  postActivity: async (activity) => {
    try {
      const newActivity = await Activity.create(activity)
      return newActivity
    } catch (error) {
      throw new Error(error)
    }
  },
  updateActivity: async (activity) => {
    try {
      const newActivity = await Activity.update(activity)
      return newActivity
    } catch (error) {
      throw new Error(error)
    }
  },
}
