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
    tableName: 'authors',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }
});

module.exports = Author;