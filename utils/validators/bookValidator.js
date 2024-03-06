const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');
const messages = require('../messages');

const createBookValidator = async (req, res, next) => {
    await body('title')
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_BOOKS_TITLE_LENGTH)
        .escape()
        .run(req);
    await body('availableCopies')
        .isInt({ min: 1 })
        .withMessage(messages.error.INVALID_AVAILABLE_COPIES)
        .run(req);
    await body('shelfLocation')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_SHELF_LOCATION)
        .run(req);
    await body('ISBN')
        .isISBN()
        .withMessage(messages.error.INVALID_ISBN)
        .run(req);
    await body('AuthorId')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_AUTHOR)
        .isInt({ min: 1 })
        .withMessage(messages.error.INVALID_AUTHOR)
        .run(req)
    await body('GenreId')
        .notEmpty()
        .withMessage(messages.error.REQUIRED_GENRE)
        .isInt({ min: 1 })
        .withMessage(messages.error.INVALID_GENRE)
        .run(req)

    await respondWithValidationErrors(req, res, next);
}

const updateBookValidator = async (req, res, next) => {
    await body('title')
        .optional()
        .isLength({ min: 5 })
        .withMessage(messages.error.INVALID_BOOKS_TITLE_LENGTH)
        .escape()
        .run(req);
    await body('availableCopies')
        .optional()
        .isInt({ min: 1 })
        .withMessage(messages.error.INVALID_AVAILABLE_COPIES)
        .run(req);
    await body('shelfLocation')
        .optional()
        .notEmpty()
        .withMessage(messages.error.REQUIRED_SHELF_LOCATION)
        .run(req);
    await body('ISBN')
        .optional()
        .isISBN()
        .withMessage(messages.error.INVALID_ISBN)
        .run(req);
    await body('AuthorId')
        .optional()
        .notEmpty()
        .withMessage(messages.error.REQUIRED_AUTHOR)
        .isInt({ min: 1 })
        .withMessage(messages.error.INVALID_AUTHOR)
        .run(req)
    await body('GenreId')
        .optional()
        .notEmpty()
        .withMessage(messages.error.REQUIRED_GENRE)
        .isInt({ min: 1 })
        .withMessage(messages.error.INVALID_GENRE)
        .run(req)

    await respondWithValidationErrors(req, res, next);
}


module.exports = { createBookValidator, updateBookValidator }