const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');
const messages = require('../messages');

const createAuthorValidator = async (req, res, next) => {
    await body('name')
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .escape()
        .run(req);
    await body('nationality')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_NATIONALITY)
        .escape()
        .run(req);
    await body('biography')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_BIOGRAPHY)
        .escape()
        .run(req);

    await respondWithValidationErrors(req, res, next);
}

const updateAuthorValidator = async (req, res, next) => {
    await body('name')
        .optional()
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .escape()
        .run(req);
    await body('nationality')
        .optional()
        .notEmpty()
        .withMessage(messages.error.REQUIRED_NATIONALITY)
        .escape()
        .run(req);
    await body('biography')
        .optional()
        .notEmpty()
        .withMessage(messages.error.REQUIRED_BIOGRAPHY)
        .escape()
        .run(req);

    await respondWithValidationErrors(req, res, next);
}


module.exports = { createAuthorValidator, updateAuthorValidator }