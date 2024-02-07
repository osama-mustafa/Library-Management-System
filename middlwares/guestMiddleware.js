const messages = require("../utils/messages");
const { handleNotAuthorized } = require("../utils/responseHandler");

const guestMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        handleNotAuthorized(req, res, messages.error.NOT_AUTHORIZED);
        return;
    }
    next();
}

module.exports = guestMiddleware;