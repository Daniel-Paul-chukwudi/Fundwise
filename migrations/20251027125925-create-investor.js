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
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
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
      viewAllocation:{
        type: Sequelize.INTEGER,
      },
      otp:{
        type: Sequelize.STRING
      },
      otpExpiredAt:{
        allowNull: false,
        type: Sequelize.INTEGER
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