const crypto = require('node:crypto')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const messages = require('./messages');

const generateToken = async (payload, secretKey, expire) => {
    try {
        const token = await jwt.sign(payload, secretKey, {
            expiresIn: expire
        });
        return token;
    } catch (error) {
        throw err
    }
}

// Verify JWT Token
const verifyToken = async (token, secret) => {
    try {
        const decoded = await jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                expiredToken: true
            }
        } else {
            return {
                invalidToken: true
            }
        }
    }
}

const generateUUID = async () => {
    const UUID = await crypto.randomUUID();
    return UUID;
}

const isTokenBlasklisted = async (token, model) => {
    const result = await model.findOne({ where: { token } });
    return result;
}

module.exports = {
    generateToken,
    generateUUID,
    isTokenBlasklisted,
    verifyToken
}

