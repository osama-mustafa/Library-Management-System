const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const messages = require('../utils/messages');
const roles = require('../utils/roles');
const { generateToken } = require('../utils/authHelper');
const RevokedAccessToken = require('./revokedAccessToken');
const RevokedRefreshToken = require('./revokedRefreshToken');


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
                msg: messages.error.INVALID_NAME_LENGTH
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: messages.error.INVALID_EMAIL,
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: roles.USER,
        allowNull: false,
        validate: {
            isIn: {
                args: [Object.values(roles)],
                msg: messages.error.INVALID_ROLE
            }

        }
    },
}, {
    timestamps: true,
    tableName: 'users',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    },
});

User.beforeCreate(async (user, options) => {
    if (user.isNewRecord) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
        user.setDataValue('password', hashedPassword);
    }
});

User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }
})

// Generate JWT token
User.prototype.generateAccessToken = async function () {
    const user = {
        id: this.id,
        name: this.name,
        role: this.role
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE;
    const token = await generateToken(user, accessTokenSecret, accessTokenExpire);
    return token;
}

// Generate Refresh Token
User.prototype.generateRefreshToken = async function () {
    const user = {
        id: this.id
    }
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE;
    const refreshToken = await generateToken(user, refreshTokenSecret, refreshTokenExpire);
    return refreshToken;
}

User.prototype.revokeAccessToken = async function (token) {
    const revokedToken = await RevokedAccessToken.create({ 'token': token });
}

User.prototype.revokeRefreshToken = async function (token) {
    const revokedToken = await RevokedRefreshToken.create({ 'token': token });
}

// Compare entered password with hashed password
User.prototype.isPasswordsMatched = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password);
}

User.prototype.isAdmin = function () {
    return this.role === roles.ADMIN;
}

User.prototype.isLibrarian = function () {
    return this.role === roles.LIBRARIAN;
}

module.exports = User;