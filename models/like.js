const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class like extends Model {}

like.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        allowNull:false
      },
      businessId:{
        type: DataTypes.UUID,
        allowNull:false,
      },


  },
  {
    sequelize, 
    modelName: 'likes', 
    timestamps:true,
  }
);

module.exports = like 