const Sequelize = require('sequelize');

const sequelize =  new Sequelize('project_G23', 'postgres', 'Beoothniel@23', {
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