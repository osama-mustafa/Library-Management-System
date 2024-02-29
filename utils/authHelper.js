const crypto = require('node:crypto')
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
    isTokenBlasklisted
}

