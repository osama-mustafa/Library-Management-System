const messages = require('../utils/messages');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((error) => {
            next(error)
        });
}


module.exports = asyncHandler;