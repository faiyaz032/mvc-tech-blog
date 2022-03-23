// Import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.JAWDB_DATABASE_URL) {
   console.log('Connected to JAWDB');
   sequelize = new Sequelize(process.env.JAWDB_DATABASE_URL);
} else {
   console.log('Connected to localhost');
   sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
   });
}

module.exports = sequelize;
