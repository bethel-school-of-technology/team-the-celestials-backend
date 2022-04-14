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

    }

  };
  Coffee.init({
    coffee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nameOfCoffee: {
      type: DataTypes.STRING,
      allowNull: true
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
