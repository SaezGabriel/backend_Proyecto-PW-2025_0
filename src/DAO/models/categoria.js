'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categoria.hasMany(models.Presupuesto, {
        foreignKey : "categoriaId",
        as : "Categoria"
      })
      Categoria.belongsTo(models.Usuario, {
        foreignKey : "UsuarioId",
        as : "Usuario"
      })
    }
  }
  Categoria.init({
    UsuarioId: DataTypes.INTEGER,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    freezeTableName : true,
    timestamps : false
  });
  return Categoria;
};