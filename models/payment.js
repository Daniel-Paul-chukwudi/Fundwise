const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class payment extends Model {}

payment.init(
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
      paymentType:{
        type: DataTypes.ENUM('subscribtion','investment'),
        
      },
      userType:{
        type: DataTypes.ENUM('businessOwner','investor'),
        
      },
      price: {
        type: DataTypes.INTEGER,
      
      },
      reference: {
        type: DataTypes.STRING
        
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Successful', 'Failed'),
        defaultValue: 'Pending'
      }



  },
  {
    sequelize, 
    modelName: 'payments', 
    timestamps:true,
  }
);

module.exports = payment 