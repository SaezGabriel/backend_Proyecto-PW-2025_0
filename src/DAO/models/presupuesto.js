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
      Presupuesto.belongsTo(models.Usuario, {
        foreignKey : "UsuarioId",
        as : "Usuario",
        onDelete: "CASCADE"
      })
    }
  }
  Presupuesto.init({
    UsuarioId: DataTypes.INTEGER,
    monto_Mensual: DataTypes.NUMERIC,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Presupuesto',
    freezeTableName : true,
    timestamps : false
  });
  return Presupuesto;
};