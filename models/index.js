const fs = require('fs')
const path = require('path')
const { sequelize, Sequelize } = require('../config/sequelize')
const db = {}

fs.readdirSync(__dirname)
  .filter(filepath => filepath !== 'index.js' && filepath.indexOf('.js') > -1)
  .map(filepath => {
    const model = sequelize.import(path.join(__dirname, filepath))
    db[model.name] = model
  })

Object.keys(db).map(modelName => {
  const model = db[modelName]
  if ('associate' in model) model.associate(db)
})

module.exports = Object.assign(db, { sequelize, Sequelize })
