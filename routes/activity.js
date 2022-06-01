const express = require('express')

const router = express.Router()

const { post, put } = require('../controllers/activity')
const { validateSchema } = require('../middlewares/validateErrors')
const activitySchema = require('../schemas/activity')

router.post('/', validateSchema(activitySchema), post)
router.put('/:id', validateSchema(activitySchema), put)

module.exports = router
