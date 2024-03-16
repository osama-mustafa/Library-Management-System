const messages = require("../utils/messages")

module.exports = (req, res) => {
    res.status(404).json({
        success: false,
        message: messages.error.PAGE_NOT_FOUND
    });
}