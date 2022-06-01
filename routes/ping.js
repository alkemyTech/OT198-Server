const express = require('express')
const { upload } = require('../middlewares/uploadImage')

const router = new express.Router()
const { pong } = require('../controllers/ping')

router.post('/', upload.single('image'), pong)

module.exports = router
