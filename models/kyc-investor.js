const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class kycinvestor extends Model {}

kycinvestor.init(
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
    modelName: 'kycinvestor',
    timestamps: true
  }
);

module.exports = kycinvestor;
