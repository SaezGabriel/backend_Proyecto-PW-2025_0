'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class codigovef extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  codigovef.init({
    codigo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'codigovef',
    freezeTableName : true,
    timestamps : false
  });
  return codigovef;
};