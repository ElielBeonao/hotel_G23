const { DataTypes } = require('sequelize');
const db = require('../config/index').db;
const UtilisateurCompteModel = require('./compte-utilisateur.model');
const LocationModel = require('./location.model');

const PaiementModel = db.define('Paiement', {
    p_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    p_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    p_montant: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    id_loc: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Location',
        key: 'id_loc'
      }
    },
    nas_emp: {
      type: DataTypes.BIGINT,
      references: {
        model: 'CompteUtilisateur',
        key: 'id_user'
      }
    }
  }, {
    tableName: 'paiement',
    timestamps: false
  });

PaiementModel.belongsTo(UtilisateurCompteModel, {foreignKey: 'nas_emp', as: 'employe'});
PaiementModel.belongsTo(LocationModel, {foreignKey: 'id_loc', as: 'location'});

module.exports = PaiementModel;