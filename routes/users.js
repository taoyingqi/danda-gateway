var express = require('express')
var router = express.Router()
const controller = require('../controllers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/:id', controller.users.get)
router.post('/', controller.users.create)

module.exports = router
