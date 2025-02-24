'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Historial', [
      {
        usuario_id: 1,
        accion: 'Agrego gasto',
        fecha: new Date()
      },
      {
        usuario_id: 2,
        accion: 'Elimino gasto',
        fecha: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Historial', null, {});
  }
};
