'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Universities',
      [
        {
          id: 1,
          universityName: 'Bread University',
          address: 'TaiSeng test 4811122',
          email: 'bread@org.edu.my',
          createdAt: new Date(),
          createdBy: 'Raymus',
          updatedAt: new Date(),
          updatedBy: 'Raymus'
        },
        {
          id: 2,
          universityName: 'NUS',
          address: 'Unknown address',
          email: 'nus@gmail.com',
          createdAt: new Date(),
          createdBy: 'Raymus',
          updatedAt: new Date(),
          updatedBy: 'Raymus'
        },
      ],
      {}
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Universities', null, {});

  }
};
