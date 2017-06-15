var express = require('express')
var router = express.Router()
const { wxconfig } = require('../config')
const models = require('../models')
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

router.get('/accessToken', (req, res, next) => {
  client.getAccessToken(req.query.code, (e, result) => {
    let content = {}
    // code error
    if (e) {
      res.send({
        code: 1004,
        msg: 'code错误'
      })
    }
    content.accessToken = result.data.access_token
    content.openid = result.data.openid
    client.getUser(content.openid, (err, result) => {
      if (err) {
        console.log(err)
        res.send(content)
      }
      if (!models.users.fondOne({
        where: {
          user_guid: content.openid
        }
      })) {
        const var1 = models.users.create({
          user_guid: result.openid,
          nickname: result.nickname,
          sex: result.sex,
          province: result.province,
          city: result.city,
          country: result.country,
          headimgurl: result.headimgurl
        })
        console.log(var1)
      }

      // success
      console.log(result)
      content.wxUser = result
      res.send(content)
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
