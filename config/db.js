// Establish MySQL DB Connection with Express.js
// => npm install --save sequelize
// => npm install --save mysql2

const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS, {
//     host: 'mysql',
//     dialect: 'mysql',
// });

const sequelize = new Sequelize(
    'library_system',
    'root',
    '', {
    host: 'mysql',
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(process.env.DB_NAME, 'process.env.DB_NAME')
        console.log(process.env.DB_USER, 'process.env.DB_USER')
        console.log(process.env.DB_PASS, 'process.env.DB_PASS')
        console.log(process.env.DB_HOST, 'process.env.DB_HOST')
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectDB }



