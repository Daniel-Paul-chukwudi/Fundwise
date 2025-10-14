const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database')

class User extends Model {}

User.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      isVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      isGoogle:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      role: {
        type:DataTypes.ENUM(['talent','investor','admin']),
        allowNull: false,
        defaultValue:"talent"
      }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Users', // We need to choose the model name
    timestamps:true
  },
);

module.exports = User 