const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class Kyc extends Model {}

Kyc.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    residentialAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    investmentType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    investmentRange: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preferredSelectors: {
      type: DataTypes.STRING,
      allowNull: false
    },

    governmentIdFile: {
      type: DataTypes.BLOB('long')
    },
    proofOfAddressFile: {
      type: DataTypes.BLOB('long')
    },

    verificationStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'kyc_verifications',
    timestamps: true
  }
);

module.exports = Kyc;
