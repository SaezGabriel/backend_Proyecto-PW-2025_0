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
    await queryInterface.bulkInsert("Rol", [
      { nombre : "User" },
      { nombre : "Admin" }
    ])
    return queryInterface.bulkInsert('Usuario', [
      {
      nombre: 'Jose',
      correo : "jose@example.com",
      contraseña : "1234",
      rol : 1
      },
      {
        nombre: 'Maria',
        correo : "maria@example.com",
        contraseña : "1234",
        rol : 1
      },
      {
        nombre: 'Pepe',
        correo : "pepe@example.com",
        contraseña : "abcd",
        rol : 2
      }
        
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Usuario', null, {});
     }
  }
};
