const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const ResetPasswordToken = sequelize.define('ResetPasswordToken', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expiredAt: {
        type: DataTypes.DATE,
        defaultValue: () => Date.now() + 10 * 60 * 1000
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: User.id
        }
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    timestamps: true,
    tableName: 'reset_password_tokens',
});

module.exports = ResetPasswordToken;

