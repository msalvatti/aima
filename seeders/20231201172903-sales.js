module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sales', [
      {
        date: new Date('2023-12-01T14:30:00.000Z'),
        total: 1000.00,
        productId: 1,
        supplierId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sales', {}, {});
  },
};