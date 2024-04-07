const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/index').db;

const ChaineHoteliereModel = db.define('ChaineHoteliere', {
    id_ch: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_ch: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'chaine_hoteliere',
    freezeTableName: true,
    timestamps: false

});

module.exports = ChaineHoteliereModel;

// -- CREATE TABLE IF NOT EXISTS public.chaine_hoteliere
// -- (
// --     id_ch serial NOT NULL,
// --     nom_ch character varying NOT NULL,
// --     PRIMARY KEY (id_ch)
// -- );