const express = require('express')

const router = new express.Router()

const { list, listSlide } = require('../controllers/slide')

router.get('/', list)

router.get('/:id', listSlide)

module.exports = router
