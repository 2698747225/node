const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const { config } = require('./config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,  // 连接池max连接数
    min: 9,   // 连接池min连接数
    idle: 30000   // 自动断开连接时长
  }
})

/**
 * @desc attributes {
 *                    email: {type:String, unique: true, note-null: true }
 *                    password: {type:Number}
 *                  }
 */
function defineModel (name, attributes) {
  const attrs = {};
  for (let key in attributes) {
    const obj = attributes[key]
    if (typeof obj === 'object' && obj.type) {
      // 默认不为空
      obj.allowNull = obj.allowNull || false;
      attrs[key] = obj;
    } else {
      attrs[key] = {
        type: obj,
        allowNull: false
      };
    }
  }
  // 默认字段 createdAt、updatedAt、id、version自动加上
  attrs.id = {
    type: Sequelize.STRING(50),
    primaryKey: true
  };
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  }

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
    hooks: {
      // 这个钩子函数在创建时调用
      beforeValidate (obj) {
        const now = +new Date();
        if (obj.isNewRecord) {
          if (!obj.id) obj.id = generateId();
          obj.createdAt = +now;
          obj.updatedAt = +now;
          obj.version = 0;
        }
      },
      // 更新对象模型时修改版本等
      beforeUpdate (obj) {
        obj.version++;
        obj.updatedAt = +new Date()
      }
    }
  })
}


function generateId () {
  return uuid.v4()
}

module.exports.defineModel = defineModel
module.exports.sequelize = sequelize