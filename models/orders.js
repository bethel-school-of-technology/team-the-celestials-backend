'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
   
    static associate(models) {
     this.hasOne(models.User, {
      foreignKey:'user_id',
    
    });
     
    this.hasMany(models.Coffee);
    }
  }
  Orders.init({
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};