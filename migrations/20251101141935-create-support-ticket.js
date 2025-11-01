'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('supporttickets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId:{
        type: Sequelize.UUID
      },
      businessId:{
        type: Sequelize.UUID
      },
      title:{
        type: Sequelize.STRING
      },
      description:{
        type: Sequelize.STRING
      },
      ticketStatus:{
        type: Sequelize.ENUM('open','under review','closed')
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
    await queryInterface.dropTable('supporttickets');
  }
};