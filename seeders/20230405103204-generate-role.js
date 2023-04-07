'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      name: 'admin'
    }, {
      name: 'user'
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface('roles', null);
  }
};
