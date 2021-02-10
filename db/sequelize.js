const { Sequelize, DataTypes } = require('sequelize');
const db_conn = require('../config/db_config.js')

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(db_conn[process.env.NODE_ENV]);

const modelDefiners = [
	require('./models/happy_wish')(sequelize, DataTypes),
	require('./models/horoscope')(sequelize, DataTypes),
	require('./models/zodiac_animal')(sequelize, DataTypes),
	require('./models/customer')(sequelize, DataTypes),
];

// create all models instances
for (const modelDefiner of modelDefiners) {
	modelDefiner.build();
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
