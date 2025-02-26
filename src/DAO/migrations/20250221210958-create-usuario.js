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
    await queryInterface.addConstraint("Presupuesto", {
      name : "FK_PRESUPUESTO_USUARIO",
      type : "FOREIGN KEY",
      fields : ["UsuarioId"],
      references : {
        table : "Usuario",
        field : "id"
      },
      onDelete: "CASCADE"
    })

    await queryInterface.addConstraint("Egresos", {
      name : "FK_EGRESOS_USUARIO",
      type : "FOREIGN KEY",
      fields : ["UsuarioId"],
      references : {
        table : "Usuario",
        field : "id"
      },
      onDelete: "CASCADE"
    })

    await queryInterface.addConstraint("ResetPassword", {
      name : "FK_RESETPASSWORD_USUARIO",
      type : "FOREIGN KEY",
      fields : ["UsuarioId"],
      references : {
        table : "Usuario",
        field : "id"
      },
      onDelete: "CASCADE"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuario');
  }
};