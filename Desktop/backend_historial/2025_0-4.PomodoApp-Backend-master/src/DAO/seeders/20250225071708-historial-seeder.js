"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Historiales", [
      {
        accion: "Usuario creado",
        proyectoId: 1,
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accion: "Proyecto actualizado",
        proyectoId: 2,
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accion: "Usuario eliminado",
        proyectoId: 3,
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Historiales", null, {});
  },
};
