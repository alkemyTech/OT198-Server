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
  updateActivity: async (activity, id) => {
    try {
      const editActivity = await Activity.update(activity, {
        where: { id },
      })
      const activityEdited = await Activity.findByPk(id)
      return editActivity[0] === 1
        ? {
          code: 200, status: true, message: 'Activity edited', body: activityEdited,
        }
        : { code: 404, status: false, message: `Activity ${id} not found` }
    } catch (error) {
      throw new Error(error)
    }
  },
}
