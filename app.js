var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var logStream = require('./config/logStream')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var request = require('request')
const { proxy } = require('./config')
const models = require('./models')
var session = require('express-session')

var index = require('./routes/index')
var users = require('./routes/users')
var oauth = require('./routes/oauth')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('combined'))
app.use(logger('combined', {stream: logStream(path.join(__dirname, 'logs'))}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser('youzidata'))
app.use(session({
  store: new session.MemoryStore({ reapInterval: 900000 }),
  secret: 'youzidata',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, path: '/' }
}))

app.use('/', index)
app.use('/users', users)
app.use('/wx/oauth', oauth)

// Authorization
app.use(function (req, res, next) {
  console.log(0, !session.user)
  if (!session.user) {
    console.log(1, req.url)
    if (req.url.indexOf('/wx/oauth') > 0 || req.url.indexOf('code=') > 0) {
      next() // 如果请求的地址是登录则通过，进行下一个请求
    } else {
      res.status(401).send({
        'msg': '没有访问权限'
      })
    }
  } else {
    next()
  }
})

// proxy handler
app.use('/api/*', function (req, res, next) {
  console.log(req.path, req.params)
  var url = proxy.target + req.originalUrl
  console.log(`[Proxy=${url}]`)
  var options = {
    url: url,
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(req.body)
  }
  console.log(options)
  request(
    options,
    function (e, r, body) {
      console.log(e, body)
      res.send(JSON.parse(body))
    })
  // error
  // req.pipe(request(options, function (e, r, body) {
  //   // console.log('代理返回的数据',body);
  // })).pipe(res)

  // success
  // res.pipe(request(
  //   options,
  //   function (e, r, body) {
  //     console.log(e, r, body)
  //   })).pipe(res)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

;(async function init () {
  await models.sequelize.sync()
}())

console.log(1, process.env.PORT)

module.exports = app
