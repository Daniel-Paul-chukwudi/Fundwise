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
        allowNull: false
      },
      fundGoal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      industry: {
        type: Sequelize.STRING
      },
      yearFounded: {
        type: Sequelize.INTEGER
      },
      businessModel: {
        type: Sequelize.STRING
      },
      revenueModel: {
        type: Sequelize.STRING
      },
      targetMarket: {
        type: Sequelize.STRING
      },
      fundingStage: {
        type: Sequelize.STRING
      },
      fundingSought: {
        type: Sequelize.INTEGER
      },
      currentRevenue: {
        type: Sequelize.INTEGER
      },
      pitchDeckUrl: {
        type: Sequelize.STRING
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      businessOwner: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('businesses');
  }
};