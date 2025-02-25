'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presupuesto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UsuarioId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      monto_Mensual: {
        type: Sequelize.NUMERIC
      },
      categoriaId: {
        type: Sequelize.INTEGER
      }
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Presupuesto');
  }
};