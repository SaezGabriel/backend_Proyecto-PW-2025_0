'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Egresos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Egresos.belongsTo(models.Categoria, {
        foreignKey : "categoriaId",
        as : "Categoria"
      })
    }
  }
  Egresos.init({
    UsuarioId: DataTypes.INTEGER,
    monto: DataTypes.NUMERIC,
    fecha: DataTypes.DATEONLY,
    descripcion: DataTypes.STRING,
    recursivo: DataTypes.BOOLEAN,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Egresos',
    freezeTableName : true,
    timestamps : false
  });
  return Egresos;
};