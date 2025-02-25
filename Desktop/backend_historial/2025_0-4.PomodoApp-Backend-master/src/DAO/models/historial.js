"use strict";

module.exports = (sequelize, DataTypes) => {
const Historial = sequelize.define(
    "Historial",
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    },
    {
    tableName: "Historiales",
    timestamps: true,
    }
);

return Historial;
};
