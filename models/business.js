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

// Users.hasMany(business,{
//   foreignKey:"businessOwner",
//   as:"businesses",
//   onDelete:"CASCADE",
//   onUpdate:"CASCADE"
// })
// business.belongsTo(Users,{
//   foreignKey:'businessOwner',
//   as:'businessOwner'
// })

module.exports = business 