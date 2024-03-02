const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RevokedAccessToken = sequelize.define('RevokedAccessToken', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    revokedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'revoked_access_tokens',
});

module.exports = RevokedAccessToken;

