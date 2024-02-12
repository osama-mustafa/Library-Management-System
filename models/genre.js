const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Genre = sequelize.define('Genre', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    tableName: 'genres',
});

module.exports = Genre;

