const jwt = require('jsonwebtoken');
const messages = require('../utils/messages');
const { handleNotAuthorized } = require('../utils/responseHandler')

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        handleNotAuthorized(req, res);
        return;
    }
    const token = authHeader.split(' ')[1];
    const privateKey = process.env.JWT_SECRET;
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