'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agreements', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      investorId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      businessOwner:{
        type: Sequelize.UUID
      },
      businessId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      totalInvestment:{
        type: Sequelize.INTEGER
      },
      agrementStatus:{
        type:Sequelize.ENUM(['meetup','negociation','ongoing','finalized']),
        allowNull: false
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
    await queryInterface.dropTable('agreements');
  }
};
