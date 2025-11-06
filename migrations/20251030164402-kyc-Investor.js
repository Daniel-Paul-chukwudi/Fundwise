'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kycinvestors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      profilePIc:{
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      residentialAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      investmentType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      governmentIdUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      proofOfAddressUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      governmentIdPublicId:{
        type: Sequelize.STRING
      },
      proofOfAddressPublicId:{
        type: Sequelize.STRING
      },
      profilePicPublicId:{
        type: Sequelize.STRING
      },
      verificationStatus: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kycinvestors');
  }
};
