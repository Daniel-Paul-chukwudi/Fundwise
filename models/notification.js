const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class notification extends Model {}

notification.init(
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
      status:{
        type: DataTypes.ENUM('unread','read'),
        defaultValue:'unread'
      } 
  },
  {
    sequelize, 
    modelName: 'notifications', 
    timestamps:true,
  }
);

module.exports = notification 