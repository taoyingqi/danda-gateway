var express = require('express')
var router = express.Router()
const { wxconfig } = require('../config')
const models = require('../models')
var OAuth = require('wechat-oauth')
var client = new OAuth(wxconfig.appid, wxconfig.appsecret)
var sha1 = require('sha1')
var session = require('express-session')

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

router.get('/accessToken', async (req, res, next) => {
  await client.getAccessToken(req.query.code, async (e, result) => {
    let content = {}
    // code error
    if (e) {
      // code 已失效
      res.status(410)
      res.send({
        msg: 'code错误'
      })
    }
    content.accessToken = result.data.access_token
    content.openid = result.data.openid
    // 查询用户
    const user = await models.users.findOne({
      where: {
        user_guid: content.openid
      }
    })
    if (user) {
      content.wxUser = user
      res.send(content)
    } else {
      // wx 获取用户信息
      await client.getUser(content.openid, (err, result) => {
        if (err) {
          console.log(err)
          res.send(content)
        }
        // success
        console.log(result)
        const newUser = {
          user_guid: result.openid,
          nickname: result.nickname,
          sex: result.sex,
          province: result.province,
          city: result.city,
          country: result.country,
          headimgurl: result.headimgurl,
          create_time: new Date()
        }
        // 保存用户信息
        const var1 = models.users.create(newUser)
        req.session.user = newUser
        console.log('create success')
        console.log(var1)
        content.wxUser = newUser
        res.send(content)
      })
    }
  })
})

router.get('/:openid', async function (req, res, next) {
  console.log(req.params)
  // client.getUser(req.params.openid, function (e, result) {
  //   console.log(e, result)
  //   req.session.user = result
  //   res.send(result)
  // })
  const user = await models.users.findOne({
    where: {
      user_guid: req.params.openid
    }
  })
  session.user = user
  console.log(1, session.user)
  res.send(user)
})

module.exports = router
