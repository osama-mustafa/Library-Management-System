const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');
const messages = require('../messages');

const createUserValidator = async (req, res, next) => {
    await body('name')
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .isAlphanumeric()
        .withMessage(messages.error.ALPHANUMERIC_NAME)
        .run(req);
    await body('email')
        .isEmail()
        .withMessage(messages.error.INVALID_EMAIL)
        .escape()
        .run(req);
    await body('role')
        .optional()
        .isAlpha()
        .run(req);
    await body('password')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_PASSWORD)
        .run(req);

    await respondWithValidationErrors(req, res, next);
}

const updateUserValidator = async (req, res, next) => {
    await body('name')
        .optional()
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .isAlphanumeric()
        .withMessage(messages.error.ALPHANUMERIC_NAME)
        .run(req);
    await body('email')
        .optional()
        .isEmail()
        .withMessage(messages.error.INVALID_EMAIL)
        .run(req);
    await body('role')
        .optional()
        .isAlpha()
        .run(req);
    await body('password')
        .optional()
        .run(req);

    await respondWithValidationErrors(req, res, next);
}


module.exports = { createUserValidator, updateUserValidator }