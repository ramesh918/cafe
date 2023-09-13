// seeders/seed-cafes.js

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const locations = ['Location1', 'Location2', 'Location3', 'Location4'];
    const cafes = [];

    // Create 15 cafes with random locations from the array
    for (let i = 1; i <= 15; i++) {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];

      cafes.push({
        id: uuidv4(),
        name: `Cafe ${i}`,
        description: `Description for Cafe ${i}`,
        logo: null, // You can set the logo path if needed
        location: randomLocation,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert cafes into the 'Cafes' table
    await queryInterface.bulkInsert('Cafe', cafes, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all cafes (this is the reverse operation)
    await queryInterface.bulkDelete('Cafe', null, {});
  },
};
