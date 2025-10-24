const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');


class agrement extends Model {}

agrement.init(
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
      businessId: {
        type: DataTypes.UUID,
        allowNull:false
      },
      agrementStatus:{
        type: DataTypes.ENUM(['meetup','negociation','ongoing','finalized']),
        allowNull: false,
        defaultValue:"meetup"
      },

  },
  {
    sequelize, 
    modelName: 'agrements', 
    timestamps:true,
  }
);

module.exports = agrement 