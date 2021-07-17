const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const connection = require('../../lib/sequelize');
// const { Article } = require('./Article');

class User extends Model {}

User.init(
  // Schema
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
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
    modelName: 'User',
    paranoid: true,
  },
);

const cryptPassword = /* 1BBCFG34237 */ async (user) => {
  // eslint-disable-next-line no-param-reassign
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
};
User.addHook('beforeCreate', /* 1BBCFG34237 */ cryptPassword);
User.addHook('beforeUpdate', /* 1BBCFG34237 */ cryptPassword);
// User.removeHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);

module.exports = User;
