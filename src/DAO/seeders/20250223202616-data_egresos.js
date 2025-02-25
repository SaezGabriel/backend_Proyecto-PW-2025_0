'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Egresos', [
      {
        //Restar 1 al mes o sino recibiras datos diferentes.
        UsuarioId : 1,
        monto : 129.99,
        // Date("12/12/2024")
        fecha : new Date(2024,11,12),
        descripcion : "La Niebla, libro de Steven King",
        recursivo : false,
        categoriaId : 3,
      },
      {
        UsuarioId: 1,
        monto : 1229.99,
        fecha : new Date(2024,1,12),
        descripcion : "Servicio de Luz",
        recursivo : true,
        categoriaId : 1,
      },
      {
        UsuarioId: 1,
        monto : 779.99,
        fecha : new Date(2024,11,2),
        descripcion : "Servicio de Agua",
        recursivo : true,
        categoriaId : 2,
      },{
        UsuarioId: 2,
        monto : 64.99,
        fecha : new Date(2025,11,25),
        descripcion : "Pizza",
        recursivo : false,
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
