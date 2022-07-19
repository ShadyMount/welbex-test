const SequelizeAuto = require('sequelize-auto');
require('dotenv').config()
const auto = new SequelizeAuto(process.env.DB_BASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    "ssl": { rejectUnauthorized: false }
  },
  directory: './models', // where to write files
  port: '5432',
  caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
  singularize: true, // convert plural table names to singular model names
  additional: {
      timestamps: false
      // ...options added to each model
  }
  //...
})

auto.run();