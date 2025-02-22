module.exports = (sequelize, DataTypes) => {
  const Egreso = sequelize.define("Egreso", {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      fecha: {
          type: DataTypes.DATEONLY,
          allowNull: false
      },
      categoria: {
          type: DataTypes.STRING,
          allowNull: false
      },
      descripcion: {
          type: DataTypes.STRING,
          allowNull: true
      },
      monto: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
      },
      recurrente: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
  }, {
      tableName: "Egresos",
      timestamps: false
  });

  return Egreso;
};
