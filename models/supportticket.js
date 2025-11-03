const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class supportticket extends Model {}

supportticket.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId:{
        type: DataTypes.UUID
      },
      businessId:{
        type: DataTypes.UUID
      },
      title:{
        type: DataTypes.STRING
      },
      description:{
        type: DataTypes.STRING
      },
      ticketStatus:{
        type: DataTypes.ENUM('open','under review','closed'),
        defaultValue:'open'
      }
      
      
  },
  {
    sequelize, 
    modelName: 'supporttickets', 
    timestamps:true,
  }
);

module.exports = supportticket 