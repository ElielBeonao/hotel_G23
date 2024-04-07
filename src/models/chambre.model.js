const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/index').db;
const EtablissementHotelierModel = require('./etablissement-hotelier.model');

// -- CREATE TABLE IF NOT EXISTS public.chambre
// -- (
// --     id_c character varying(6) NOT NULL,
// --     intitule_c character varying NOT NULL,
// --     prix_c double precision NOT NULL DEFAULT 0.00,
// --     tv_c boolean NOT NULL DEFAULT true,
// --     air_cond_c boolean NOT NULL DEFAULT true,
// --     refrigerator_c boolean NOT NULL DEFAULT true,
// --     extensible_c boolean NOT NULL DEFAULT false,
// --     capacite_c smallint NOT NULL DEFAULT 1,
// --     issue_c boolean NOT NULL DEFAULT false,
// --     id_eh bigint NOT NULL,
// --     disponible_c boolean NOT NULL,
// --     PRIMARY KEY (id_c)
// -- );

const ChambreModel = db.define('chambre', {
    id_c: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    intitule_c: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prix_c: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.00,
    },
    tv_c: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    air_cond_c: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    refrigerator_c: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    extensible_c: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    capacite_c: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
    },
    issue_c: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    id_eh: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'EtablissementHotelier',
            key: 'id_eh'
        }
    },
    disponible_c: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'chambre',
    timestamps: false
});

ChambreModel.belongsTo(EtablissementHotelierModel, {foreignKey: 'id_eh', as: 'etablissementHotelier'});
// ChambreModel.belongsTo(, {foreignKey: 'id_c'});

module.exports = ChambreModel;
