'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proyecto.belongsTo(models.Categoria, {
        foreignKey : "categoriaId",
        as : "Categoria"
      })

      Proyecto.hasMany(models.ProyectoXUsuario, {
        foreignKey : "proyectoId",
        as : "ProyectoXUsuario"
      })
    }
  }
  Proyecto.init({
    nombre: DataTypes.STRING,
    nro_pom: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proyecto',
    freezeTableName : true,
    timestamps : false
  });
  return Proyecto;
};