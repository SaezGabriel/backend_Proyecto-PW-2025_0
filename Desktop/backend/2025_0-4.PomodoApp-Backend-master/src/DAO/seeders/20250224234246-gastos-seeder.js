export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Gastos", [
      {
        descripcion: "Compra de alimentos",
        monto: 50.0,
        fecha: new Date(),
        categoria: "Alimentos",
        recurrente: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcion: "Pago de internet",
        monto: 30.0,
        fecha: new Date(),
        categoria: "Servicios",
        recurrente: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Gastos", {});
  },
};
