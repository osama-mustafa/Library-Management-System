// Establish MySQL DB Connection with Express.js
// => npm install --save sequelize
// => npm install --save mysql2

const { Sequelize } = require('sequelize');
require('dotenv').config();

// FIXME: Try testing sequelize connection with docker
// with host equals 'mysql' 
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectDB }