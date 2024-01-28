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
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    biography: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'authors'
});

User.sync()
    .then()
    .catch((error) => {
        console.log(`Cannot create Author Table => ${error}`);
    })

module.exports = Author;