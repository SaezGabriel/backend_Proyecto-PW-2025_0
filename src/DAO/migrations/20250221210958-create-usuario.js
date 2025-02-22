'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      contraseña: {
        type: Sequelize.STRING
      },
      rol: {
        type: Sequelize.INTEGER
      },
    
    });
    await queryInterface.addConstraint("Categoria", {
      name : "FK_CATEGORIA_USUARIO",
      type : "FOREIGN KEY",
      fields : ["UsuarioId"],
      references : {
        table : "Usuario",
        field : "id"
      }
    })
    await queryInterface.addConstraint("Presupuesto", {
      name : "FK_PRESUPUESTO_USUARIO",
      type : "FOREIGN KEY",
      fields : ["UsuarioId"],
      references : {
        table : "Usuario",
        field : "id"
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuario');
  }
};