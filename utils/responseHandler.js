const messages = require("./messages")

const handleValidationError = (req, res, message = 'Validation error!') => {
    res.status(400).json({
        success: false,
        message: message
    });
}

const handleDuplicateRecordError = (req, res, message = 'Duplicate record!') => {
    res.status(400).json({
        success: false,
        message: message
    });
}

const handleNotAuthorized = (req, res, message = 'Not authorized') => {
    res.status(401).json({
        success: false,
        message: message
    });
}

const handleRevokedToken = (req, res, message = 'Revoked Token') => {
    res.status(401).json({
        success: false,
        message: message
    });
}

const handleForbidden = (req, res, message = 'Forbidden!') => {
    res.status(403).json({
        success: false,
        message: message
    });
}

const handleResourceNotFound = (req, res, message = 'Resource not found!') => {
    res.status(404).json({
        success: false,
        message: message
    });
}

const handleServerError = (req, res, message = 'Internal server error!') => {
    res.status(500).json({
        success: false,
        message: message
    });
}

module.exports = {
    handleValidationError,
    handleResourceNotFound,
    handleDuplicateRecordError,
    handleNotAuthorized,
    handleForbidden,
    handleServerError,
    handleRevokedToken
}