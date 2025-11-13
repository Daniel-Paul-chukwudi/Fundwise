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
        
      },
      industry: {
        type: Sequelize.STRING,

      },
      description: {
        type: Sequelize.STRING,

      },
      yearFounded: {
        type: Sequelize.INTEGER,

      },
      businessModel: {
        type: Sequelize.STRING,

      },
      revenueModel: {
        type: Sequelize.STRING,

      },
      targetMarket: {
        type: Sequelize.STRING,

      },
      fundingStage: {
        type: Sequelize.STRING,

      },
      fundingSought: {
        type: Sequelize.INTEGER,

      },
      currentRevenue: {
        type: Sequelize.INTEGER,

      },
      pitchDeck: {
        type: Sequelize.STRING, 
      },
      businessRegisterationCertificate:{
        type: Sequelize.STRING
      },
      pitchDeckPublicId:{
        type: Sequelize.STRING
      },
      businessRegisterationCertificatePublicId:{
        type: Sequelize.STRING
      },
      fundRaised: {
        type: Sequelize.INTEGER,
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
      },
      businessOwnerName:{
        type: Sequelize.STRING
      },
      businessStatus:{
        type: Sequelize.ENUM('under review','verified')
      },
      businessViewCount:{
        type: Sequelize.INTEGER
      },
      businessViewStatus:{
        type: Sequelize.ENUM('active','disabled')
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