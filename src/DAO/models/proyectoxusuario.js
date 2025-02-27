'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProyectoXUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProyectoXUsuario.belongsTo(models.Proyecto, {
        foreignKey : "proyectoId",
        as : "Proyecto"
      }),
      ProyectoXUsuario.belongsTo(models.Usuario, {
        foreignKey : "usuarioId",
        as : "Usuario"
      })
    }
  }
  ProyectoXUsuario.init({
    proyectoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    rol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProyectoXUsuario',
    freezeTableName : true,
    timestamps : false
  });
  return ProyectoXUsuario;
};