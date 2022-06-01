const express = require('express')

const router = express.Router()

const { post, update } = require('../controllers/activity')
const { validateSchema } = require('../middlewares/validateErrors')
const activitySchema = require('../schemas/activity')

router.post('/', validateSchema(activitySchema), post)
router.put('/:id', validateSchema(activitySchema), update)

module.exports = router
