const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const messages = require('../utils/messages');
const roles = require('../utils/roles');


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
    }
});

// Hash password before save
User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
});

// Generate JWT token
User.prototype.generateSignedJwtToken = async function () {
    try {
        const user = {
            id: this.id,
            name: this.name,
            role: this.role
        }
        const token = await jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        return token;

    } catch (err) {
        throw err
    }
}


// Compare entered password with hashed password
User.prototype.isPasswordsMatched = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password);
}


// Create users table using model synchronization
// User.sync()
//     .then()
//     .catch((error) => {
//         console.log(`Cannot create User Table => ${error}`);
//     });

module.exports = User;