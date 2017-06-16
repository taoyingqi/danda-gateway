const models = require('../models')

module.exports = {
  async create (req, res, next) {
    let user = req.body
    user.create_time = new Date()
    console.log(`[user=${JSON.stringify(user)}]`)
    const content = await models.users.create(user).catch(function (err) {
      console.log(err.message)
      res.status(500)
      return {msg: '保存失败'}
    })
    res.send(content)
  },
  async get (req, res, next) {
    const id = req.params.id
    console.log(`[id]=${id}`)
    const user = await models.users.findOne({
      where: {
        user_guid: id
      }
    })
    if (!user) res.status(404)
    res.send(user)
  }
}
