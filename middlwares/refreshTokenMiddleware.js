const { handleNotAuthorized, handleInvalidToken } = require('../utils/responseHandler');
const { isTokenBlasklisted, verifyToken } = require('../utils/authHelper');
const RevokedAccessToken = require('../models/revokedAccessToken');
const RevokedRefreshToken = require('../models/revokedRefreshToken');
const messages = require('../utils/messages');


const refreshTokenMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const refreshToken = req.body.refreshToken;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    // Check if there is no Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        handleNotAuthorized(req, res);
        return;
    }

    const accessToken = authHeader.split(' ')[1];

    // Check if access token or refresh token is revoked;
    const isAccessTokenRevoked = await isTokenBlasklisted(accessToken, RevokedAccessToken);
    const isRefreshTokenRevoked = await isTokenBlasklisted(refreshToken, RevokedRefreshToken)
    if (isAccessTokenRevoked || isRefreshTokenRevoked) {
        handleInvalidToken(req, res, messages.error.REVOKED_TOKEN);
        return;
    }

    // Check if refresh token is expired or invalid
    const refreshTokenVerifyResult = await verifyToken(refreshToken, refreshTokenSecret);
    if (refreshTokenVerifyResult.expiredToken || refreshTokenVerifyResult.invalidToken) {
        handleInvalidToken(req, res, messages.error.INVALID_REFRESH_TOKEN);
        return;
    }

    // Check if access token is invalid
    const accessTokenVerifyResult = await verifyToken(accessToken, accessTokenSecret);

    // If access token is invalid, We will return error!
    if (accessTokenVerifyResult.invalidToken) {
        handleInvalidToken(req, res, messages.error.INVALID_ACCESS_TOKEN);
        return;
    }

    // Check if access token is expired, and refresh token is valid
    // We will decode refresh token and get user details from it;
    // so we can procedd in refresh token process and generate new access token 
    if (accessTokenVerifyResult.expiredToken) {
        const decoded = await verifyToken(refreshToken, refreshTokenSecret);
        req.user = decoded;
        next();
    }
}

module.exports = refreshTokenMiddleware