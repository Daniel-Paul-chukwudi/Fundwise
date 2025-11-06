const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class Business extends Model {}

Business.init(
  {
    id: {
      allowNull:false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    businessName: {
      type: DataTypes.STRING,
      
    },
    industry: {
      type: DataTypes.STRING,
      
    },
    description: {
      type: DataTypes.STRING,
      
    },
    yearFounded: {
      type: DataTypes.INTEGER,
      
    },
    businessModel: {
      type: DataTypes.STRING,
      
    },
    revenueModel: {
      type: DataTypes.STRING,
      
    },
    targetMarket: {
      type: DataTypes.STRING,
      
    },
    fundingStage: {
      type: DataTypes.STRING,
      
    },
    fundingSought: {
      type: DataTypes.INTEGER,
      
    },
    currentRevenue: {
      type: DataTypes.INTEGER,
      
    },
    pitchDeck: {
      type: DataTypes.STRING, 
      
    },
    businessRegisterationCertificate:{
      type: DataTypes.STRING
    },
    pitchDeckPublicId:{
      type: DataTypes.STRING
    },
    businessRegisterationCertificatePublicId:{
      type: DataTypes.STRING
    },
    fundGoal: {
      type: DataTypes.INTEGER,
      
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
      
    },
    businessStatus:{
      type: DataTypes.ENUM('under review','verified'),
      defaultValue:'under review'
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