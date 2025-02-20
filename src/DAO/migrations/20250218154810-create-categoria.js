'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categoria', {
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

    await queryInterface.addConstraint("Proyecto", {
      name : "FK_PROYECTO_CATEGORIA",
      type : "FOREIGN KEY",
      fields : ["categoriaId"],
      references : {
        table : "Categoria",
        field : "id"
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categoria');
  }
};