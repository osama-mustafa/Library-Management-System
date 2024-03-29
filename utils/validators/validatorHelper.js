const { validationResult } = require('express-validator');

// Filter out 'type' and 'location' keys from each error object in express-validtor
const filterErrors = async (errors) => {
    const filtered = await errors.map(error => {
        const { type, location, path, ...rest } = error;
        return rest;
    });
    return filtered;
}

// Extract errors as validation result from request and return the proper response
const respondWithValidationErrors = async (req, res, next) => {
    const result = validationResult(req);
    const errors = result.array();
    const filteredErrors = await filterErrors(errors);

    if (result.isEmpty()) {
        return next()
    }
    return res.status(400).json({
        success: false,
        errors: filteredErrors
    });
}

module.exports = respondWithValidationErrors