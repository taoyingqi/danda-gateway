var express = require('express')
var router = express.Router()
var WXBizMsgCrypt = require('wechat-crypto')
// var wxoauth = require('wechat-oauth')
const { wxconfig } = require('../config')
var OAuth = require('wechat-oauth')
var client = new OAuth(wxconfig.appid, wxconfig.secret)

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
  var url = client.getAuthorizeURL(
    req.query.redirectUrl,
    req.query.state,
    req.query.accept ? 'snsapi_userinfo' : 'snsapi_base')
  res.send({
    url
  })
})

router.get('/accessToken', function (req, res, next) {
  client.getAccessToken(req.query.code, function (e, result) {
    var accessToken = result.data.access_token
    var openid = result.data.openid
    res.send({
      accessToken,
      openid
    })
  })
})

router.get('/users/:openid', function (req, res, next) {
  console.log(req.params)
  client.getUser(req.params.openid, (e, result) => {
    res.send(result)
  })
})

module.exports = router
