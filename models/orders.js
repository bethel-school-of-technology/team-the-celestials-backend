'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
   
    static associate(models) {
     this.belongsTo(models.User, {
      foreignKey:'id'
    });
     this.hasMany(models.Coffee, {
      foreignKey:'id'
    })
    }
  }
  Orders.init({
    cartItems: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};