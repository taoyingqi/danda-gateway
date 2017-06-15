module.exports = {
  wxconfig: {
    checkSignature: true,
    appid: 'wx0b5ebf1e230c6cd8',
    appsecret: '5a8e955f137343cd91aab94abd092777',
    token: 'DijkstraEinstein',
    encodingAESKey: 'zqL0AGne2eGd0X22LsgP8z5uoDRm7LYijIW8fo1KDyl',
    notifyUrl: '12',
    tradeType: 'JSAPI'
  },
  appcode: 'token123',
  proxy: {
    // target: 'http://10.0.108.24:8080'
    target: 'http://106.15.43.10:10001'
  },
  mysql: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'dantatv',
    username: 'root',
    password: 'ixzmysql5',
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
