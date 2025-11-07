const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class save extends Model {}

save.init(
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
    modelName: 'saves', 
    timestamps:true,
  }
);

module.exports = save 