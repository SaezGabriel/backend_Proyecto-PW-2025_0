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
    return queryInterface.bulkInsert("Categoria", [
      { 
        nombre : "Servicios"
      },
      { 
        nombre : "Alimentacion"
      },
      { 
        nombre : "Ocio"
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categoria', null, {});
     }
  }
};
