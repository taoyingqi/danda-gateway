var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var request = require('request')
const { proxy } = require('./config')

var index = require('./routes/index')
var users = require('./routes/users')
var oauth = require('./routes/oauth')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/wx/users', users)
app.use('/wx/oauth', oauth)

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
      console.log(e, r, body)
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

module.exports = app
