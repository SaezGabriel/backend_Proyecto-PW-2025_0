'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Egresos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UsuarioId: {
        type: Sequelize.INTEGER
      },
      monto: {
        type: Sequelize.NUMERIC
      },
      fecha: {
        type: Sequelize.STRING    
      },
      descripcion: {
        type: Sequelize.STRING    
      },
      recursivo: {
        type: Sequelize.BOOLEAN
      },
      categoriaId: {
        type: Sequelize.INTEGER
      },
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Egresos');
  }
};