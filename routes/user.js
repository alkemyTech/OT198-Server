const router = require('express').Router()
const { deleteUsers } = require('../controllers/user')

// delete user
router.delete('/:id', deleteUsers)

module.exports = router
