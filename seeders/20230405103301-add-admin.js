'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [{
      first_name: "shoaib",
      last_name: "khan",
      email: "admin@gmail.com",
      password: password,
      roleId: 1,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {email: 'admin@gmail.com'})
  }
};
