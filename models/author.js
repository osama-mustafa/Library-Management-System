const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
    },
    biography: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'authors'
});

// Create authors table using model synchronization
Author.sync()
    .then()
    .catch((error) => {
        console.log(`Cannot create authors table: ${error}`);
    })

module.exports = Author;