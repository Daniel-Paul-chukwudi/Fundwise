const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');


class agreement extends Model {}

agreement.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      investorId: {
        type: DataTypes.UUID,
        allowNull:false
      },
      businessName:{
        type: DataTypes.STRING
      },
      businessOwner:{
        type:DataTypes.UUID
      },
      businessOwnerName:{
        type:DataTypes.STRING
      },
      businessId: {
        type: DataTypes.UUID,
        allowNull:false
      },
      totalInvestment:{
        type: DataTypes.INTEGER
      },
      agrementStatus:{
        type: DataTypes.ENUM('meetup','negociation','ongoing','finalized'),
        allowNull: false,
        defaultValue:"meetup"
      },

  },
  {
    sequelize, 
    modelName: 'agreements', 
    timestamps:true,
  }
);

module.exports = agreement 