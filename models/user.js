const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class User extends Model {}

User.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
      },
      phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      isVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      isGoogle:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      role:{
        type: DataTypes.STRING,
        defaultValue:"BusinessOwner"
      },
      subscribed:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      subscriptionTier:{
        type: DataTypes.ENUM('free','growth','premium'),
        defaultValue:'free'
      },
      renew:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      subscriptionStart:{
        type: DataTypes.BIGINT,
      },
      subscriptionEnd:{
        type: DataTypes.BIGINT
      },
      otp:{
        type: DataTypes.STRING
      },
      otpExpiredAt:{
        type: DataTypes.BIGINT
      },
      kycStatus:{
        type: DataTypes.ENUM('not provided','under review','verified'),
        defaultValue:'not provided'
      }
  },
  {
    sequelize, 
    modelName: 'Users', 
    timestamps:true,
  }
);

module.exports = User 