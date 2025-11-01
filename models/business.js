const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class Business extends Model {}

Business.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yearFounded: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    businessModel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    revenueModel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetMarket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fundingStage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fundingSought: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentRevenue: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pitchDeck: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    fundGoal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    businessOwner: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Business',
    tableName: 'businesses',
    timestamps: true
  }
);

module.exports = Business;