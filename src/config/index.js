const Sequelize = require('sequelize');

const sequelize =  new Sequelize('beonao_motel_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {db:sequelize, jwtSecret: 'Ottawa@University'};