'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('investors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isVerified:{
        type: Sequelize.BOOLEAN
      },
      isGoogle:{
        type: Sequelize.BOOLEAN
      },
      subscribed:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      role:{
        type: Sequelize.STRING,
        allowNull:false
      },
      viewAllocation:{
        type: Sequelize.INTEGER,
      },
      totalInvestment:{
        type: Sequelize.BIGINT
      },
      subscriptionTier:{
        type: Sequelize.ENUM('free','growth','premium')
      },
      renew:{
        type: Sequelize.BOOLEAN,
      },
      subscriptionStart:{
        type: Sequelize.BIGINT
      },
      subscriptionEnd:{
        type: Sequelize.BIGINT
      },
      otp:{
        type: Sequelize.STRING
      },
      otpExpiredAt:{
        allowNull: false,
        type: Sequelize.BIGINT
      },
      kycStatus:{
        type: Sequelize.ENUM('not provided','under review','verified')
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
    await queryInterface.dropTable('investors');
  }
};