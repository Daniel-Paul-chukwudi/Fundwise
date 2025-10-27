const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class business extends Model {}

business.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      fundGoal: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      description:{
        type: DataTypes.STRING,
        allowNull:false
      },
      category:{
        type: DataTypes.STRING,
        allowNull:false
      },
      likeCount:{
        type: DataTypes.INTEGER,
      },
      viewCount:{
        type: DataTypes.INTEGER
      },
      businessOwner:{
        type: DataTypes.UUID,
        allowNull:false,
      }

  },
  {
    sequelize, 
    modelName: 'businesses', 
    timestamps:true,
  }
);

module.exports = business 