var express = require('express')
var router = express.Router()
const { wxconfig } = require('../config')
var OAuth = require('wechat-oauth')
var client = new OAuth(wxconfig.appid, wxconfig.appsecret)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/:openid', function (req, res, next) {
  console.log(req.params)
  client.getUser(req.params.openid, function (e, result) {
    res.send(result)
  })
})

module.exports = router
