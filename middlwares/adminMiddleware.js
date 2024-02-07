const User = require('../models/user');
const messages = require('../utils/messages');
const { handleForbidden } = require('../utils/responseHandler');

const adminMiddleware = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== 'admin') {
        handleForbidden(req, res, messages.error.FORBIDDEN);
        return;
    }
    next();
}

module.exports = adminMiddleware;