const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');
const messages = require('../messages');

const registerValidator = async (req, res, next) => {
    await body('name')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_NAME)
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .escape()
        .run(req);
    await body('email')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_EMAIL)
        .isEmail()
        .withMessage(messages.error.INVALID_EMAIL)
        .run(req);
    await body('password')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_PASSWORD)
        .run(req);

    await respondWithValidationErrors(req, res, next);
}

module.exports = registerValidator
