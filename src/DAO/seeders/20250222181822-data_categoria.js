'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
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
   
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categoria', null, {});
     }
  }
};
