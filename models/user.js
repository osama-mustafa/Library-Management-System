const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 100],
                msg: 'Name must be between 1 and 100 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'users'
});

// Hash password before save
User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
})

// Create users table using model synchronization
User.sync()
    .then()
    .catch((error) => {
        console.log(`Cannot create User Table => ${error}`);
    });

module.exports = User;