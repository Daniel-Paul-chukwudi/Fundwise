const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database');

class meeting extends Model {}

meeting.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      host:{
        type: DataTypes.UUID
      },
      guest:{
        type: DataTypes.UUID
      },
      meetingLink:{
        type: DataTypes.STRING
      },
      meetingTitle: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
      },
      date:{
        type:DataTypes.STRING,
        allowNull:false
      },
      time: {
        type: DataTypes.STRING,
        allowNull:false
      },
      meetingType:{
        type: DataTypes.STRING,
      },
      note:{
        type: DataTypes.STRING,
      },
      meetingStatus:{
        type: DataTypes.ENUM('Awaiting Approval','Approved','Pending','Reschedule Requested','Concluded')
      }
      
      
  },
  {
    sequelize, 
    modelName: 'meetings', 
    timestamps:true,
  }
);

module.exports = meeting 