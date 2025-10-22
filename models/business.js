const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class Business extends Model {}

Business.init(
  {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isGoogle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('talent', 'business', 'admin'),
      allowNull: false,
      defaultValue: 'business',
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'Business', // Model name (capitalized convention)
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: { attributes: {} },
    },
    hooks: {
      beforeCreate: (user) => {
        if (user.email) {
          user.email = user.email.toLowerCase();
        }
      },
      beforeUpdate: (user) => {
        if (user.email) {
          user.email = user.email.toLowerCase();
        }
      },
    },
  }
);

module.exports = Business;
