const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');


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
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'users',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
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
            id: this._id,
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



// Create users table using model synchronization
// User.sync()
//     .then()
//     .catch((error) => {
//         console.log(`Cannot create User Table => ${error}`);
//     });

module.exports = User;