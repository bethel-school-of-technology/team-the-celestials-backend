'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coffees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coffees.init({
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
      type: DataTypes.DICEMAL,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'coffees',
  });
  return coffees;
};

//Added price to coffee models UIR