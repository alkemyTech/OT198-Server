const express = require('express')
const { uploadImage } = require('../middlewares/uploadImage')

const router = new express.Router()
const { pong } = require('../controllers/ping')

router.post('/', uploadImage('image'), pong)

module.exports = router
