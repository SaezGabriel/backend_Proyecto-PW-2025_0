'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Rol, {
        foreignKey : "rol",
        as : "Rol"
      }),

      Usuario.hasMany(models.Presupuesto, {
        foreignKey : "UsuarioId",
        as : "UsuarioPre",
        onDelete: "CASCADE"
      })
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    rol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName : true,
    timestamps : false
  });
  return Usuario;
};