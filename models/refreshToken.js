// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');
// const User = require('./user');

// const RefreshToken = sequelize.define('RefreshToken', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     token: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     revoked: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     expiredAt: {
//         type: DataTypes.DATE,
//         defaultValue: null
//     },
//     UserId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: User,
//             key: User.id
//         }
//     },

// }, {
//     timestamps: true,
//     tableName: 'refresh_tokens',
// });

// User.hasMany(RefreshToken);
// RefreshToken.belongsTo(User);

// module.exports = RefreshToken;

