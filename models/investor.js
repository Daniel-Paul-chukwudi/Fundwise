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
      subscribed:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      role:{
        type: DataTypes.STRING,
        defaultValue: "Investor"
      },
      viewAllocation:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      totalInvestment:{
        type: DataTypes.BIGINT,
        defaultValue:0
      },
      otp:{
        type: DataTypes.STRING
      },
      otpExpiredAt:{
        type: DataTypes.BIGINT
      },
      kycStatus:{
        type: DataTypes.ENUM('empty','under review','verified'),
        defaultValue:'empty'
      }
  },
  {
    sequelize, 
    modelName: 'investors', 
    timestamps:true,
  }
);

module.exports = investor 