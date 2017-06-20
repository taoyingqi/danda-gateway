# danda-gateway
danda 2.0 api gateway


## express
## express-session

## [sequelize.js](http://docs.sequelizejs.com/)

## wechat
[node wechat](https://github.com/node-webot/wechat)

## 项目结构
* /config _微信、代理、数据库、日志配置_
* /controllers _控制层_
* /logs _日志文件_
* /models _sequelize model 定义_
* /routes _express route_
* /app.js _入口文件_
* /package.json
* /start _启动脚本_

# 接口
* /wx/service 微信接入
* /wx/redirect 网页授权跳转
* /wx/accessToken 获取 accessToken，需要 code，返回数据包含用户信息

# deployed on linux
1. environment
* 安装 node-v8.10
2. linux commend line
* clone code from git repository
* cd /danta-gateway
3. install
* chmod +x start
* ./start
3.1. reinstall
