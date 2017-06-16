var fs = require('fs')
var path = require('path')
var fileStreamRotator = require('file-stream-rotator')

// create a rotating write stream
module.exports = function (logDir) {
  // ensure log directory exists
  fs.existsSync(logDir) || fs.mkdirSync(logDir)
  return fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: true
  })
}
