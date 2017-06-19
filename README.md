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

# deployed on linux
1. environment
* 安装 node-v8.10
2. linux commend line
* clone code from git repository
2.1. update
* cd /danta-gateway
* git checkout .
* git pull origin master
3. install
* expose PORT=10020
* chmod +x start
* ./start
3.1. reinstall
* 2.1, 3