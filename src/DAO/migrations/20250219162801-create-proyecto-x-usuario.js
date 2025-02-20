'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProyectoXUsuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      proyectoId: {
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER
      },
      rol: {
        type: Sequelize.INTEGER
      }
    });

    await queryInterface.addConstraint("ProyectoXUsuario", {
      name : "FK_PROYECTOXUSUARIO_PROYECTO",
      type : "FOREIGN KEY",
      fields : ["proyectoId"],
      references : {
        table : "Proyecto",
        field : "id"
      }
    })
    await queryInterface.addConstraint("ProyectoXUsuario", {
      name : "FK_PROYECTOXUSUARIO_USUARIO",
      type : "FOREIGN KEY",
      fields : ["usuarioId"],
      references : {
        table : "Usuario",
        field : "id"
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProyectoXUsuario');
  }
};