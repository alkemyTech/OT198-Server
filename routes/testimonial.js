const router = require('express').Router()
const { createTestimonialSchema, updateTestimonialSchema } = require('../schemas/testimonial')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { post, destroy, update } = require('../controllers/testimonial')
const { uploadImage } = require('../middlewares/uploadImage')

// Define testimonial schemas
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       in: header
 *       name: Authorization
 *   schemas:
 *     TestimonialCreateSchema:
 *       type: object
 *       required:
 *         - name
 *         - content
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the testimonial
 *         image:
 *          type: string
 *          description: The testimonial image
 *         content:
 *           type: string
 *           description: The content of the testimonial
 *       example:
 *         name: Testimonial 1
 *         image: https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *         content: "This is a testimonial"
 *     TestimonialResponseSchema:
 *       type: object
 *       required:
 *         - name
 *         - content
 *       properties:
 *         id:
 *          type: integer
 *         description: The id of the testimonial
 *         name:
 *           type: string
 *           description: The name of the testimonial
 *         image:
 *          type: string
 *          description: The testimonial image
 *         content:
 *           type: string
 *           description: The content of the testimonial
 *       example:
 *         status: true
 *         message: "Testimonial created successfully"
 *         body:
 *            id: 1
 *            name: Testimonial 1
 *            image: https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *            content: "This is a testimonial"
 *            createdAt: "2020-01-01T00:00:00.000Z"
 *            updatedAt: "2020-01-01T00:00:00.000Z"
 *     Error400Schema:
 *        type: object
 *        properties:
 *          code:
 *           type: integer
 *           description: The error code
 *          status:
 *              type: boolean
 *              description: The status of the response
 *          message:
 *              type: string
 *              description: The message of the response
 *        example:
 *         code: 400
 *         status: false
 *         message: "Testimonial not created"
 *     Error500Schema:
 *        type: object
 *        properties:
 *          code:
 *           type: integer
 *           description: The error code
 *          status:
 *              type: boolean
 *              description: The status of the response
 *          message:
 *              type: string
 *              description: The message of the response
 *        example:
 *         code: 500
 *         status: false
 *         message: "Internal server error"
 *     Error404Schema:
 *        type: object
 *        properties:
 *          code:
 *           type: integer
 *           description: The error code
 *          status:
 *              type: boolean
 *              description: The status of the response
 *          message:
 *              type: string
 *              description: The message of the response
 *        example:
 *         code: 404
 *         status: false
 *         message: "Testimonial with id 1 not found"

 */

// Define testimonial tags
/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: The testimonials API
 */

// Document routes
/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           image:
 *            type: string
 *            format: binary
 *            required: true
 *           name:
 *            type: string
 *            required: true
 *           content:
 *            type: string
 *            required: true
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/TestimonialResponseSchema'
 *       400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Error400Schema'
 *       500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Error500Schema'
 */
router.post('/', auth, isAdmin, uploadImage('image'), validateSchema(createTestimonialSchema), post)

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Update a testimonial
 *     tags: [Testimonials]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The testimonial id
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           image:
 *            type: string
 *            format: binary
 *            required: true
 *           name:
 *            type: string
 *            required: true
 *           content:
 *            type: string
 *            required: true
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/TestimonialResponseSchema'
 *       500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Error500Schema'
 *       404:
 *        description: Testimonial not found
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Error404Schema'
 */
router.put(
  '/:id',
  auth,
  isAdmin,
  uploadImage('image'),
  validateSchema(updateTestimonialSchema),
  update,
)

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Testimonials]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The testimonial id
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *      200:
 *        description: Testimonial deleted successfully
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                example:
 *                   code: 200
 *                   status: true
 *                   message: "Testimonial deleted successfully"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Error500Schema'
 */
router.delete('/:id', auth, isAdmin, destroy)

module.exports = router
