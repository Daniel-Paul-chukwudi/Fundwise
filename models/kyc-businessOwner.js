const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class kycbusinessowner extends Model {}

kycbusinessowner.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    profilePic:{
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.UUID
    },
    fullName: {
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
      type: DataTypes.STRING,
      allowNull: false
    },
    proofOfAddressUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    governmentIdPublicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proofOfAddressPublicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicPublicId:{
      type: DataTypes.STRING
    },
    verificationStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  },
  {
    sequelize,
    modelName: 'kycbusinessowner',
    timestamps: true
  }
);

module.exports = kycbusinessowner;
