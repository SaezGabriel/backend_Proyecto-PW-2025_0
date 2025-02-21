'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presupuesto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Presupuesto.belongsTo(models.Categoria, {
        foreignKey : "categoriaId",
        as : "Categoria"
      })
    }
  }
  Presupuesto.init({
    categoriaId: DataTypes.INTEGER,
    monto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Presupuesto',
    freezeTableName : true,
    timestamps : false
  });
  return Presupuesto;
};