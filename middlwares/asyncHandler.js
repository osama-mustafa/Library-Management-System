const { ValidationError } = require('sequelize');
const messages = require('../utils/messages');
const { handleValidationError } = require('../utils/responseHandler');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((error) => {
            if (error instanceof ValidationError) {
                handleValidationError(req, res, error?.errors[0].message);
                return;
            }
            next(error)
        });
}


module.exports = asyncHandler;