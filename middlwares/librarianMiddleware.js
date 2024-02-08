const User = require('../models/user');
const messages = require('../utils/messages');
const roles = require('../utils/roles');
const { handleForbidden } = require('../utils/responseHandler');

const librarianMiddleware = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    console.log(req.user, 'req.user')
    if (user?.role == roles.LIBRARIAN || user?.role == roles.ADMIN) {
        next()
    } else {
        handleForbidden(req, res, messages.error.FORBIDDEN);
        return;
    }
}

module.exports = librarianMiddleware;