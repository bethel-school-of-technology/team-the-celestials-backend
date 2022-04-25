'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Coffee,{
        through: 'Orders'
      });
    }
  };
  User.init({
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};