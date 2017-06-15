var express = require('express')
var router = express.Router()
const { wxconfig } = require('../config')
var OAuth = require('wechat-oauth')
var client = new OAuth(wxconfig.appid, wxconfig.appsecret)
var sha1 = require('sha1')

router.get('/service', function (req, res, next) {
  const signature = req.query.signature
  const timestamp = req.query.timestamp
  const nonce = req.query.nonce
  const echostr = req.query.echostr
  console.log(`[signature=${signature}, timestamp=${timestamp}, nonce=${nonce}, echostr=${echostr}]`)
  var str = [wxconfig.token, timestamp, nonce].sort().join('')
  var sha = sha1(str)
  console.log(`[sha=${sha}]`)
  if (sha === signature) {
    res.send(echostr + '')
  } else {
    res.send('err')
  }
})

router.get('/redirect', function (req, res, next) {
  var url = client.getAuthorizeURL(
    req.query.redirectUrl,
    req.query.state || '',
    req.query.accept ? 'snsapi_userinfo' : 'snsapi_base')
  console.log(`[url=${url}]`)
  res.redirect(url)
})

router.get('/accessToken', function (req, res, next) {
  client.getAccessToken(req.query.code, function (e, result) {
    const accessToken = result.data.access_token
    const openid = result.data.openid
    let wxuser = null
    client.getUser(openid, function (err, result) {
      if (err) {
        console.log(err)
      }
      wxuser = result
    })
    console.log(result.data)
    res.send({
      accessToken,
      openid,
      wxuser
    })
  })
})

router.get('/:openid', function (req, res, next) {
  console.log(req.params)
  client.getUser(req.params.openid, function (e, result) {
    console.log(e, result)
    res.send(result)
  })
})

module.exports = router
