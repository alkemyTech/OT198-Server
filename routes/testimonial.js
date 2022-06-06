const router = require('express').Router()
const { createTestimonialSchema } = require('../schemas/testimonial')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { post, destroy } = require('../controllers/testimonial')
const { uploadImage } = require('../middlewares/uploadImage')

router.post('/', auth, isAdmin, uploadImage('image'), validateSchema(createTestimonialSchema), post)

router.delete('/:id', auth, isAdmin, destroy)

module.exports = router
