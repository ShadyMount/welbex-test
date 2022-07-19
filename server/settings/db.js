require('dotenv').config()

const Sequelize = require('sequelize')



const sequelize = new Sequelize(process.env.DB_BASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": { rejectUnauthorized: false },
        //     "ssl": true
    },
});

const items = require('../models/init-models')(sequelize).items




module.exports = { items } 