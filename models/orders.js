'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
   
    static associate(models) {
    
    };
  }
  Orders.init({
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};