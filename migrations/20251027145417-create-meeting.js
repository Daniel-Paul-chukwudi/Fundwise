'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      host:{
        type: Sequelize.UUID
      },
      guest:{
        type: Sequelize.UUID
      },
      meetingLink:{
        type: Sequelize.STRING
      },
      hostName:{
        type: Sequelize.STRING
      },
      businessOwnerName:{
        type: Sequelize.STRING
      },
      businessName:{
        type: Sequelize.STRING
      }, 
      meetingTitle: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      date:{
        type:Sequelize.STRING,
        allowNull:false
      },
      time: {
        type: Sequelize.STRING,
        allowNull:false
      },
      meetingType:{
        type: Sequelize.STRING,
      },
      note:{
        type: Sequelize.STRING,
      },
      meetingStatus:{
        type: Sequelize.ENUM('Awaiting Approval','Approved and Upcoming','Reschedule Requested','Declined','Concluded'),
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
    await queryInterface.dropTable('meetings');
  }
};