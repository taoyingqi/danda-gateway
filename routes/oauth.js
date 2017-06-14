var express = require('express')
var router = express.Router()
var WXBizMsgCrypt = require('wechat-crypto')
// var wxoauth = require('wechat-oauth')
const { wxconfig } = require('../config')

router.get('/wxservice', function (req, res, next) {
  var msgSignature = req.query.msg_signature
  var timestamp = req.query.timestamp
  var nonce = req.query.nonce
  console.log(`[msg_signature=${msgSignature}, timestamp=${timestamp}, nonce=${nonce}]`)
  var echostr = req.query.echostr
  var cryptor = new WXBizMsgCrypt(wxconfig.token, wxconfig.encodingAESKey, wxconfig.corpId)
  var s = cryptor.decrypt(echostr)
  res.send(s.message)
})

router.get('/redirect', function (req, res, next) {
  res.send({
    id: 1000,
    name: 'funded'
  })
})

module.exports = router
