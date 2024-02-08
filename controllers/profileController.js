const asyncHandler = require('../middlwares/asyncHandler');
const Borrow = require('../models/borrow');
const User = require('../models/user');
const Book = require('../models/book');
const messages = require('../utils/messages');

exports.getBorrowedBooks = asyncHandler(async (req, res) => {

    const borrowedBooks = await User.findByPk(req.user.id, {
        attributes: [],
        include: {
            model: Book,
            attributes: ['id', 'title'],
            through: {
                model: Borrow,
                attributes: ['checkoutDate', 'dueDate'],
            }
        }
    })

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        data: borrowedBooks
    })
});