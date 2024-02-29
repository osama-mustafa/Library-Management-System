const jwt = require('jsonwebtoken');
const messages = require('../utils/messages');
const { handleNotAuthorized } = require('../utils/responseHandler');
const RevokedAcessToken = require('../models/revokedAcessToken');
const { isTokenBlasklisted } = require('../utils/authHelper');
const { handleRevokedToken } = require('../utils/responseHandler');


const isAccessTokenRevoked = async (token) => {
    const accessToken = await RevokedAcessToken.findOne({ token });
    return accessToken;
}


const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if there is no Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        handleNotAuthorized(req, res);
        return;
    }
    const token = authHeader.split(' ')[1];

    // Check if token is revoked 
    const isTokenRevoked = await isTokenBlasklisted(token, RevokedAcessToken);
    if (isTokenRevoked) {
        handleRevokedToken(req, res, messages.error.REVOKED_TOKEN);
        return;
    }

    const privateKey = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, privateKey, function (err, decoded) {
        if (err) {
            handleNotAuthorized(req, res, messages.error.INVALID_TOKEN);
            return;
        }
        req.user = decoded;
        req.token = token;
        next();
    });
}

module.exports = authenticateUser