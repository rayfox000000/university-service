const Sequelize = require('sequelize');
const {
    host,
    username,
    password,
    database,
    dialect
} = require('../config/config.json').database

// Configure database connection
const sequelize = new Sequelize( database, username, password, {
  host: host,
  dialect: dialect, 
});

module.exports = sequelize;