'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
   
    static associate(models) {
     this.belongsTo(models.User, {
      foreignKey:'user_id',
      targetKey: "user_id"
    });


     this.belongsToMany(models.Coffee, {
      //foreignKey:'coffee_id'
    })
    }
  }
  Orders.init({
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cartItems: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};