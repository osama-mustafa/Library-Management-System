const messages = require("./messages")

const handleResourceNotFound = (req, res, message = 'Resource not found!') => {
    res.status(404).json({
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

const handleForbidden = (req, res, message = 'Forbidden!') => {
    res.status(403).json({
        success: false,
        message: message
    });
}

module.exports = {
    handleResourceNotFound,
    handleDuplicateRecordError,
    handleNotAuthorized,
    handleForbidden
}