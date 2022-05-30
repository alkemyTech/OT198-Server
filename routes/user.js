const router = require('express').Router()
const { destroy, list } = require('../controllers/user')

// list all users
router.get('/', list)

// delete user
router.delete('/:id', destroy)

module.exports = router
