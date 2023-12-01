module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Suppliers', [
      {
        name: 'Supplier 1',
        contactPerson: 'John Karl',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Suppliers', {}, {});
  },
};