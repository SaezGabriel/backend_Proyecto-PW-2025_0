'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('access_logs', [
      { usuario_id: 1, access_time: '2024-01-15 10:30:00', action: 'login', firstaccess: true },
      { usuario_id: 2, access_time: '2024-02-10 14:45:00', action: 'login', firstaccess: true },
      { usuario_id: 3, access_time: '2024-03-05 09:20:00', action: 'login', firstaccess: true },
      { usuario_id: 1, access_time: '2024-03-22 16:10:00', action: 'logout', firstaccess: false }
    ], {});
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('access_logs', null, {});
  }
};
