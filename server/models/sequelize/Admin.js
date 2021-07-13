const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const connection = require('../../lib/sequelize');
// const { Article } = require('./Article');

class Admin extends Model {}

Admin.init(
  // Schema
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: 'Admin',
    paranoid: true,
  },
);

const cryptPassword = /* 1BBCFG34237 */ async (user) => {
  // eslint-disable-next-line no-param-reassign
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
};
Admin.addHook('beforeCreate', /* 1BBCFG34237 */ cryptPassword);
Admin.addHook('beforeUpdate', /* 1BBCFG34237 */ cryptPassword);
// Admin.removeHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);

module.exports = Admin;
