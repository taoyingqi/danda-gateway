module.exports = function modelUsers (sequelize, DataTypes) {
  return sequelize.define('users', {
    user_guid: {
      type: DataTypes.STRING,
      primaryKey: true,
      max: {
        args: 255,
        msg: '用户ID不得超过 255 个字符'
      }
    },
    nickname: {
      type: DataTypes.STRING,
      max: {
        args: 255,
        msg: '昵称不得超过 255 个字符'
      }
    },
    origin: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.INTEGER
    },
    province: {
      type: DataTypes.STRING,
      max: {
        args: 255,
        msg: '省份不得超过 255 个字符'
      }
    },
    city: {
      type: DataTypes.STRING,
      max: {
        args: 255,
        msg: '城市不得超过 255 个字符'
      }
    },
    country: {
      type: DataTypes.STRING,
      max: {
        args: 255,
        msg: '国家不得超过 255 个字符'
      }
    },
    headimgurl: {
      type: DataTypes.STRING,
      max: {
        args: 500,
        msg: '头像不得超过 500 个字符'
      }
    },
    create_time: {
      type: DataTypes.DATE
    },
    update_time: {
      type: DataTypes.DATE
    }
  }, {
    // 不使用自动表名
    freezeTableName: true,
    // define the table's name
    tableName: 'tuserinfo',
    // I don't want createdAt
    createdAt: false,
    updatedAt: false
  })
}
