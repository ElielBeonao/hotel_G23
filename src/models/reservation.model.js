const { DataTypes } = require('sequelize');
const db = require('../config/index').db;
const UtilisateurModel = require('./compte-utilisateur.model');
const ChambreModel = require('./chambre.model');

const ReservationModel = db.define('Reservation', {
  id_res: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  date_res: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  statut_res: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  },
  // id_c: {
  //   type: DataTypes.STRING(6),
  //   allowNull: false
  // },
  // id_emp: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: 'CompteUtilisateur',
  //     key: 'nas_emp'
  //   }
  // },
  // id_cli: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: 'CompteUtilisateur',
  //     key: 'nas_cli'
  //   }
  // },
  date_debut: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'reservation',
  timestamps: false
});


ReservationModel.belongsTo(UtilisateurModel, {foreignKey: 'id_emp', as: 'employe', require: false});
ReservationModel.belongsTo(UtilisateurModel, {foreignKey: 'id_cli', as: 'client'});
ReservationModel.belongsTo(ChambreModel, {foreignKey: 'id_c', as: 'chambre'});
// ReservationModel.belongsTo(ReservationModel, {foreignKey: 'id_res', as: 'reservation'});

module.exports = ReservationModel;

// CREATE TABLE IF NOT EXISTS public.reservation
// (
//     id_res bigint NOT NULL,
//     date_res timestamp without time zone NOT NULL DEFAULT CURRENT_DATE,
//     statut_res smallint NOT NULL DEFAULT 0,
//     id_c character varying(6) COLLATE pg_catalog."default" NOT NULL,
//     id_emp integer NOT NULL,
//     id_cli integer NOT NULL,
//     date_debut timestamp without time zone NOT NULL,
//     date_fin timestamp without time zone NOT NULL,
//     CONSTRAINT reservation_pkey PRIMARY KEY (id_res),
//     CONSTRAINT reservation_id_cli_fkey FOREIGN KEY (id_cli)
//         REFERENCES public.client (nas_cli) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID,
//     CONSTRAINT reservation_id_emp_fkey FOREIGN KEY (id_emp)
//         REFERENCES public.utilisateur (nas_emp) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID
// )