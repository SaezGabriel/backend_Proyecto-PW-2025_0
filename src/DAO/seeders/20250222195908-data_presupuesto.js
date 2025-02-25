'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Categoria", [
      { nombre : "Servicios" },
      { nombre : "Alimentacion" },
      { nombre : "Ocio" }
    ])
    return queryInterface.bulkInsert('Presupuesto', [
      {
        UsuarioId : 1,
        monto_Mensual : 129.99,
        categoriaId : 3,
      },
      {
        UsuarioId: 1,
        monto_Mensual : 1229.99,
        categoriaId : 1,
      },
      {
        UsuarioId: 1,
        monto_Mensual : 779.99,
        categoriaId : 2,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Presupuesto', null, {});
     }
  }
};
