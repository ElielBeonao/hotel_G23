const { DataTypes } = require('sequelize');
const db = require('../config/index').db;

const UtilisateurInEtablissementHotelierModel = db.define('UtilisateurInEtablissementHotelier', {
    nas_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'CompteUtilisateur',
            key: 'id_user'
        }
    },
    id_eh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'EtablissementHotelier',
            key: 'id_eh'
        }
    },
    role_utilisateur: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'utilisateur_role_etablissement_hotelier',
    freezeTableName: true,
    timestamps: false

});

module.exports = UtilisateurInEtablissementHotelierModel;