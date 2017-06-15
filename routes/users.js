var express = require('express')
var router = express.Router()
const models = require('../models')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/:id', async function (req, res, next) {
  const { id } = req.params.id
  const user = await models.users.findOne({
    where: {
      user_guid: id
    }
  })
  if (!user) res.throw(404)
  res.send(user)
})

module.exports = router
