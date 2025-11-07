const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class NdaAgreement extends Model {}

NdaAgreement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    startupName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    signedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Active', 'Expired'),
      defaultValue: 'Pending'
    },
    agreementText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    agreed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'NdaAgreement',
    tableName: 'nda_agreements',
    timestamps: true
  }
);

module.exports = NdaAgreement;
