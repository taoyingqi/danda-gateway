var express = require('express')
var router = express.Router()
var WXBizMsgCrypt = require('wechat-crypto')
const { wxconfig } = require('../config')
var OAuth = require('wechat-oauth')
var client = new OAuth(wxconfig.appid, wxconfig.secret)

router.get('/service', function (req, res, next) {
  var signature = req.query.signature
  var timestamp = req.query.timestamp
  var nonce = req.query.nonce
  var echostr = req.query.echostr
  console.log(`[signature=${signature}, timestamp=${timestamp}, nonce=${nonce}, echostr=${echostr}]`)
  var cryptor = new WXBizMsgCrypt(wxconfig.token, wxconfig.encodingAESKey, wxconfig.appid)
  var s = cryptor.decrypt(echostr)
  console.log(`[s.message=${s.message}]`)
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
    console.log(result.data)
    res.send({
      accessToken,
      openid
    })
  })
})

module.exports = router
