const { DataTypes } = require('sequelize');
const db = require('../config/index').db;
const UtilisateurInEtablissementHotelierModel = require('./utilisateur-in-etablissement-hotelier.model');


const UtilisateurCompteModel = db.define('CompteUtilisateur', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_complet: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.INTEGER
    },
    password: {
        type: DataTypes.TEXT
    },
    user_type:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'compte_utilisateur',
    freezeTableName: true,
    timestamps: false

});
UtilisateurCompteModel.belongsToMany(UtilisateurInEtablissementHotelierModel, {foreignKey: 'nas_utilisateur', as: 'UtilisateurInEtablissementHoteliers', through: 'utilisateur_role_etablissement_hotelier'});

module.exports = UtilisateurCompteModel;
