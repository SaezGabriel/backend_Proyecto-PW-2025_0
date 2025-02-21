'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rol', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      }
    });
    await queryInterface.addConstraint("Usuario", {
      name : "FK_USUARIO_ROL",
      type : "FOREIGN KEY",
      fields : ["rol"],
      references : {
        table : "Rol",
        field : "id"
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rol');
  }
};