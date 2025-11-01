'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      businessId:{
        type: Sequelize.UUID
      },
      paymentType:{
        type: Sequelize.ENUM('subscription','investment'),
        
      },
      userType:{
        type: Sequelize.ENUM('businessOwner','investor'),
        
      },
      price: {
        type: Sequelize.INTEGER,
      
      },
      reference: {
        type: Sequelize.STRING
        
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Successful', 'Failed'),
        defaultValue: 'Pending'
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
    await queryInterface.dropTable('payments');
  }
};