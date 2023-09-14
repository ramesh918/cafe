// seeders/seed-employees.js

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cafes = await queryInterface.sequelize.query('SELECT id FROM Cafe');
    const cafeIds = cafes[0].map((cafe) => cafe.id);

    const employees = [];

    for (let i = 1; i <= 50; i++) {
      const randomCafeId = cafeIds[Math.floor(Math.random() * cafeIds.length)];

      employees.push({
        id: uuidv4(),
        name: `Employee ${i}`,
        email_address: `employee${i}@example.com`,
        phone_number: `9${Math.floor(Math.random() * 90000000 + 10000000)}`,
        gender: ['Male', 'Female', 'Others'][Math.floor(Math.random() * 3)],
        cafeId: randomCafeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert employees into the 'Employees' table
    await queryInterface.bulkInsert('Employee', employees, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all employees (this is the reverse operation)
    await queryInterface.bulkDelete('Employee', null, {});
  },
};
