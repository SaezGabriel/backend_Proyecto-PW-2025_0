'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ResetPassword.belongsTo(models.Usuario, {
        foreignKey : "UsuarioId",
        as : "Usuario",
        onDelete: "CASCADE"
      })
    }
  }
  ResetPassword.init({
    UsuarioId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ResetPassword',
    freezeTableName : true,
    timestamps : false
  });
  return ResetPassword;
};