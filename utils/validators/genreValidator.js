const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');
const messages = require('../messages');

const createGenreValidator = async (req, res, next) => {
    await body('name')
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .escape()
        .run(req);
    await body('description')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_DESCRIPTION)
        .escape()
        .run(req);

    await respondWithValidationErrors(req, res, next);
}

const updateGenreValidator = async (req, res, next) => {
    await body('name')
        .optional()
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_NAME_LENGTH)
        .escape()
        .run(req);
    await body('description')
        .optional()
        .notEmpty()
        .withMessage(messages.error.REQUIRED_DESCRIPTION)
        .escape()
        .run(req);
    await respondWithValidationErrors(req, res, next);
}


module.exports = { createGenreValidator, updateGenreValidator }