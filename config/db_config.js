const dotenv = require('dotenv'); 
+dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}`});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "json",
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  production: {
    host: `/cloudsql/${process.env.HOST}`,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    dialect: 'mysql',
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.HOST}`
    }
  }
}