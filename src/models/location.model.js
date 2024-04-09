const { DataTypes } = require('sequelize');
const db = require('../config/index').db;
const UtilisateurCompteModel = require('./compte-utilisateur.model');
const ChambreModel = require('./chambre.model');
const ReservationModel = require('./reservation.model');

const LocationModel = db.define('Location', {
    id_loc: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    date_loc: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    // id_res: {
    //   type: DataTypes.BIGINT,
    //   references: {
    //     model: 'Reservation',
    //     key: 'id_res'
    //   }
    // },
    // id_cli: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'CompteUtilisateur',
    //     key: 'id_cli'
    //   }
    // },
    // id_c: {
    //   type: DataTypes.STRING(6),
    //   allowNull: false,
    //   references: {
    //     model: 'Chambre',
    //     key: 'id_c'
    //   }
    // },
    // nas_emp: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'CompteUtilisateur',
    //     key: 'nas_emp'
    //   }
    // },
    date_debut: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    statut_loc: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    }
  }, {
    tableName: 'location',
    timestamps: false
  });

LocationModel.belongsTo(UtilisateurCompteModel, {foreignKey: 'nas_emp', as: 'employe', require:true});
LocationModel.belongsTo(UtilisateurCompteModel, {foreignKey: 'id_cli', as: 'client', require:true});
LocationModel.belongsTo(ChambreModel, {foreignKey: 'id_c', as: 'chambre', require: true});
LocationModel.belongsTo(ReservationModel, {foreignKey: 'id_res', as: 'reservation'});

module.exports = LocationModel;