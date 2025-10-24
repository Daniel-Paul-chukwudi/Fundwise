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
      role: {
        type: DataTypes.ENUM('talent','investor'),
        allowNull: false,
        defaultValue:"talent"
      },
      kyc:{
        type: Sequelize.TEXT,
        get() {
        const raw = this.getDataValue('amenities');
        try {
          return raw ? JSON.parse(raw) : {};
        } catch (e) {
          return {};
        }
       }
      },
      businesses:{
        type: Sequelize.TEXT,
        get() {
        const raw = this.getDataValue('amenities');
        try {
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          return [];
        }
       }
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