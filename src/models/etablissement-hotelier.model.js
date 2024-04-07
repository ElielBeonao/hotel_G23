const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/index').db;
const ChaineHoteliere = require('./chaine-hoteliere.model');
const UtilisateurInEtablissementHotelier = require('./utilisateur-in-etablissement-hotelier.model');

const EtablissementHotelierModel = db.define('EtablissementHotelier', {
    id_eh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_eh: {
        type: DataTypes.STRING
    },
    classe_eh: {
        type: DataTypes.INTEGER
    },
    adresse_eh: {
        type: DataTypes.STRING
    },
    nbr_chambres:{
        type: DataTypes.INTEGER
    },
    id_ch: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ChaineHoteliere',
            key: 'id_ch'
        }
    }
}, {
    tableName: 'etablissement_hotelier',
    freezeTableName: true,
    timestamps: false

});

// EtablissementHotelierModel.associate = (models) => {
EtablissementHotelierModel.belongsTo(ChaineHoteliere, {foreignKey: 'id_ch', as: 'chaineHoteliere'});
EtablissementHotelierModel.belongsToMany(UtilisateurInEtablissementHotelier, {foreignKey: 'id_eh', as: 'UtilisateurInEtablissementHotelier', through: 'utilisateur_role_etablissement_hotelier'});
// };

module.exports = EtablissementHotelierModel;

//  CREATE TABLE IF NOT EXISTS public.etablissement_hotelier
//  (
//      id_eh serial NOT NULL,
//      classe_eh smallint NOT NULL DEFAULT 1,
//      adresse_ch character varying NOT NULL,
//      nom_eh character varying NOT NULL,
//      nbr_chambres smallint NOT NULL DEFAULT 0,
//      id_ch bigint NOT NULL,
//      PRIMARY KEY (id_eh)
//  );

// CREATE TABLE IF NOT EXISTS public.compte_utilisateur
// (
//     id_user bigint NOT NULL DEFAULT nextval('compte_utilisateur_id_user_seq'::regclass),
//     nom_complet character varying COLLATE pg_catalog."default" NOT NULL,
//     username character varying COLLATE pg_catalog."default" NOT NULL,
//     password text COLLATE pg_catalog."default" NOT NULL,
//     user_type character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT compte_utilisateur_pkey PRIMARY KEY (id_user)
// );

// CREATE TABLE IF NOT EXISTS public.utilisateur_role_etablissement_hotelier
// (
//     nas_utilisateur bigint NOT NULL,
//     id_eh bigint NOT NULL,
//     role_utilisateur character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT pk_utilisateur_in_etbalissement_hotelier PRIMARY KEY (nas_utilisateur, id_eh),
//     CONSTRAINT fk_etablissement_hotelier_id FOREIGN KEY (id_eh)
//         REFERENCES public.etablissement_hotelier (id_eh) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID,
//     CONSTRAINT fk_utilisateur_role_etablissement_hotelier FOREIGN KEY (nas_utilisateur)
//         REFERENCES public.utilisateur (nas_emp) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
// );