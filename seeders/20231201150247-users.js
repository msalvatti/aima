const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('test123', saltRounds);

        return queryInterface.bulkInsert('Users', [
            {
                login: 'test',
                password: hashedPassword,
                email: 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', { login: 'test' }, {});
    },
};
