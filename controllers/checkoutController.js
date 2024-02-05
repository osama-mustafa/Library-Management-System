const Checkout = require("../models/checkout");
const asyncHandler = require("../middlwares/asyncHandler");
const Book = require("../models/book");
const User = require("../models/user");
const messages = require("../utils/messages");
const {
    handleResourceNotFound,
    handleDuplicateRecordError,
} = require("../utils/responseHandler");
const { sequelize } = require("../config/db");
const { QueryTypes, Op } = require("sequelize");
const Author = require("../models/author");

// @desc    Borrow book
// @route   DELETE /api/v1/checkouts/:bookId/:userId
// @access  Private/User

exports.borrowBook = asyncHandler(async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const { bookId, userId } = req.params;
            const book = await Book.findByPk(bookId, { transaction: t });
            const user = await User.findByPk(userId, { transaction: t });

            // Check if the book is available
            if (!book?.isBookAvailable()) {
                handleResourceNotFound(req, res, messages.error.INVALID_BOOK);
                return;
            }

            // Check if the user exists
            if (!user) {
                handleResourceNotFound(req, res, messages.error.INVALID_USER);
                return;
            }

            // Create checkout record
            const checkout = await Checkout.create(
                {
                    BookId: book.id,
                    UserId: user.id,
                },
                { transaction: t }
            );

            // Decrement book quantity by 1
            await book.decrement("availableCopies", { transaction: t });

            res.status(200).json({
                success: true,
                message: messages.success.BORROW_BOOK_COMPLETED,
                data: checkout,
            });
        });
    } catch (error) {
        if (error?.parent?.errno === 1062) {
            handleDuplicateRecordError(
                req,
                res,
                messages.error.BORROWED_BOOK_BY_USER
            );
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Get all borrowers
// @route   GET /api/v1/checkouts/borrowers
// @access  Private/Admin

// FIXME: This function does not return any data!
exports.getAllBorrowers = asyncHandler(async (req, res) => {
    const borrowers = await Checkout.findAll({
        include: [Book, User],
    });

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: borrowers.length,
        data: borrowers,
    });
});

// @desc    Get all books that exceed due date
// @route   GET /api/v1/checkouts/overdue-books
// @access  Private/Admin
exports.getOverdueBooks = asyncHandler(async (req, res) => {
    const books = await Book.findAll({
        attributes: ['id', 'title'],
        include: {
            model: User,
            attributes: ['id', 'name'],
            through: {
                model: Checkout,
                attributes: ["dueDate"],
                where: {
                    dueDate: {
                        [Op.lt]: new Date(),
                    },
                },
            },
        },
        where: {
            '$Users.Checkout.id$': {
                [Op.ne]: null
            }
        },
    });

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: books.length,
        data: books,
    });
});
