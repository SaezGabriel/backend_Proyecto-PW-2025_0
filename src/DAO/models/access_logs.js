"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AccessLog extends Model {
    static associate(models) {
      AccessLog.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "Usuario",
        onDelete: "CASCADE",
      });
    }
  }

  AccessLog.init(
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      access_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstaccess: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "AccessLog",
      tableName: "access_logs",
      timestamps: false,
    }
  );

  return AccessLog;
};
