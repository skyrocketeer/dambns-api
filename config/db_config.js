const dotenv = require('dotenv'); 
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    seederStorage: "json",
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
}