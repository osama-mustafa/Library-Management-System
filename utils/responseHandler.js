const messages = require("./messages")

const handleResourceNotFound = (req, res, message = 'Resource not found!') => {
    res.status(404).json({
        success: false,
        message: message
    });
}

const handleDuplicateRecordError = (req, res, message = 'Duplicate record!') => {
    console.log(message)
    res.status(400).json({
        success: false,
        message: message
    });
}


module.exports = { handleResourceNotFound, handleDuplicateRecordError }