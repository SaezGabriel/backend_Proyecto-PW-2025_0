'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert("Categoria", [
      { nombre : "ULima" },
      { nombre : "Freelance" },
      { nombre : "Personal" }
    ])

    return queryInterface.bulkInsert('Proyecto', [
     {
      nombre: 'Project Alpha',
      nro_pom: 10,
      categoriaId: Math.floor(Math.random() * 3) + 1, // Random 1-3
      status: Math.floor(Math.random() * 3) // Random 0-2
     },
     {
      nombre: 'Project Beta',
      nro_pom: 15,
      categoriaId: Math.floor(Math.random() * 3) + 1,
      status: Math.floor(Math.random() * 3)
     },
     {
      nombre: 'Project Gamma',
      nro_pom: 20,
      categoriaId: Math.floor(Math.random() * 3) + 1,
      status: Math.floor(Math.random() * 3)
     },
     {
      nombre: 'Project Delta',
      nro_pom: 12,
      categoriaId: Math.floor(Math.random() * 3) + 1,
      status: Math.floor(Math.random() * 3)
     },
     {
      nombre: 'Project Epsilon',
      nro_pom: 18,
      categoriaId: Math.floor(Math.random() * 3) + 1,
      status: Math.floor(Math.random() * 3)
     },
     {
      nombre: 'Project Zeta',
      nro_pom: 22,
      categoriaId: Math.floor(Math.random() * 3) + 1,
      status: Math.floor(Math.random() * 3)
     }
    ], {});
   },

  async down (queryInterface, Sequelize) {
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Proyecto', null, {});
     }
  }
};
