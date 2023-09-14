'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employee', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensures it's a valid email address format
        }
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[89]\d{7}$/ // Matches phone numbers that start with 8 or 9 and have 8 digits.
        }
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Others'),
        allowNull: false,
      },
      cafeId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employee');
  }
};