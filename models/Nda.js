const {Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../Database/database'); 

class NdaAgreement extends Model {}

NdaAgreement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    agreementText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    agreed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    signedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'NdaAgreement',
    tableName: 'nda_agreements',
    timestamps: true 
  }
);

module.exports = NdaAgreement;