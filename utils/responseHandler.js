const messages = require("./messages")

const handleResourceNotFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: messages.error.RESOURCE_NOT_FOUND
    });
}



module.exports = handleResourceNotFound