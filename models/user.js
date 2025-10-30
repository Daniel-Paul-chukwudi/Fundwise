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
      subscribed:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      otp:{
        type: DataTypes.STRING
      },
      otpExpiredAt:{
        type: DataTypes.BIGINT
      }
  },
  {
    sequelize, 
    modelName: 'Users', 
    timestamps:true,
  }
);

module.exports = User 