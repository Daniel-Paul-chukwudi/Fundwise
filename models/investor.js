const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class investor extends Model {}

investor.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      lastName: {
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
      subscribed:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      viewAllocation:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      otp:{
        type: DataTypes.STRING
      },
      otpExpiredAt:{
        type: DataTypes.INTEGER
      }
  },
  {
    sequelize, 
    modelName: 'investors', 
    timestamps:true,
  }
);

module.exports = investor 