'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // this.hasMany(models.Orders, {
    //   foreignKey:'id'
    // })
    }

  };
  Coffee.init({
    coffee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameOfCoffee: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingridients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Coffee',
  });
  return Coffee;
};

//Added price to coffee models UIR
