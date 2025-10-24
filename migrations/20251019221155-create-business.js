'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('businesses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
       businessName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      fundGoal: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      description:{
        type: Sequelize.STRING,
        allowNull:false
      },
      category:{
        type: Sequelize.STRING,
        allowNull:false
      },
      businessOwner:{
        type: Sequelize.UUID,
        allowNull:false,
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
    await queryInterface.dropTable('businesses');
  }
};