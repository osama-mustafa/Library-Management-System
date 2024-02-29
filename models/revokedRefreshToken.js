const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RevokedRefreshToken = sequelize.define('RevokedRefreshToken', {
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
    timestamps: true,
    tableName: 'revoked_refresh_tokens',
});

module.exports = RevokedRefreshToken;

