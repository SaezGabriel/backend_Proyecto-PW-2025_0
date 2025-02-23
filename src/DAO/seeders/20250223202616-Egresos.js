'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Egresos', [
      {
        UsuarioId : 1,
        monto : 129.99,
        fecha : Date("12/12/2024"),
        descripcion : "La Niebla, libro de Steven King",
        recursivo : false,
        categoriaId : 3,
      },
      {
        UsuarioId: 1,
        monto : 1229.99,
        fecha : Date("02/12/2024"),
        descripcion : "Servicio de Luz",
        recursivo : true,
        categoriaId : 1,
      },
      {
        UsuarioId: 1,
        monto : 779.99,
        fecha : Date("02/12/2024"),
        descripcion : "Servicio de Agua",
        recursivo : true,
        categoriaId : 2,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Egresos', null, {});
     }
  }
};
