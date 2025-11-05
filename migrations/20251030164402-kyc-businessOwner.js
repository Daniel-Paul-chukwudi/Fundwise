'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kyc_verifications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
      accountName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bankName: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('kyc_verifications');
  }
};
