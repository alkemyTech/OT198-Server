const router = require('express').Router()
const { createTestimonialSchema, updateTestimonialSchema } = require('../schemas/testimonial')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const {
  list, post, destroy, update,
} = require('../controllers/testimonial')
const { uploadImage } = require('../middlewares/uploadImage')

router.get('/', auth, list)

router.put(
  '/:id',
  auth,
  isAdmin,
  uploadImage('image'),
  validateSchema(updateTestimonialSchema),
  update,
)

router.post('/', auth, isAdmin, uploadImage('image'), validateSchema(createTestimonialSchema), post)

router.delete('/:id', auth, isAdmin, destroy)

module.exports = router
