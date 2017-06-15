const Sequelize = require('sequelize')
const { mysql } = require('./')
const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, mysql)

module.exports = { sequelize, Sequelize }
