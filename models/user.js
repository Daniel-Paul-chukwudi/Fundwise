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
        type: DataTypes.STRING,
        allowNull:false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
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
        type:DataTypes.ENUM('talent','investor','admin'),
        allowNull: false,
        defaultValue:"talent"
      }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Users', // We need to choose the model name
    timestamps:true,
    defaultScope:{
      attributes:{exclude:['password']}
    },
    scopes:{
      withPassword:{attributes:{}}
    },
    hooks:{
      beforeCreate:(user) =>{
        if(user.email){
          user.email = user.email.toLowerCase()
        }
      },
      beforeUpdate: (user) =>{
        if (user.email) {
        user.email = user.email.toLowerCase();  
        }
      }
    }
  }
);

module.exports = User 