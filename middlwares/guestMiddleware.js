const messages = require("../utils/messages");
const { handleNotAuthorized } = require("../utils/responseHandler");

const guestMiddleware = (req, res, next) => {
    if (req.headers?.authorization) {
        handleNotAuthorized(req, res, messages.error.NOT_AUTHORIZED);
        return;
    }
    next();
}

module.exports = guestMiddleware;