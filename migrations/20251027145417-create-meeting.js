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