const asyncHandler = require("../middlwares/asyncHandler");
const Book = require("../models/book");
const User = require("../models/user");
const Borrow = require("../models/borrow");
const messages = require("../utils/messages");
const {
    handleResourceNotFound,
    handleDuplicateRecordError,
    handleServerError,
    handleForbidden,
} = require("../utils/responseHandler");
const { sequelize } = require("../config/db");
const { Op } = require("sequelize");


// @desc    Borrow book
// @route   POST /api/v1/borrow/:bookId/:userId
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

            // Check if the user exceed borrow limit for books
            const isBorrowLimitExceeded = await Borrow.isUserExceedBorrowLimit(user.id);
            if (isBorrowLimitExceeded) {
                return res.status(400).json({
                    success: false,
                    message: messages.error.EXCEED_BORROW_LIMIT
                });
            }

            // Create borrow record
            const borrow = await Borrow.create(
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
                data: borrow,
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
        handleServerError(req, res, messages.error.SERVER_ERROR);
    }
});


// @desc    Get all borrowers
// @route   GET /api/v1/borrow/borrowers
// @access  Private/Admin

exports.getAllBorrowers = asyncHandler(async (req, res) => {
    const borrowers = await User.findAll({
        attributes: ['id', 'name'],
        include: {
            model: Book,
            attributes: ['id', 'title'],
            through: {
                model: Borrow,
            }
        },
        where: {
            '$Books.Borrow.id$': {
                [Op.ne]: null
            }
        }
    })

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: borrowers.length,
        data: borrowers,
    });
});


// @desc    Get all books that exceed due date
// @route   GET /api/v1/borrow/overdue-books
// @access  Private/Admin

exports.getOverdueBooks = asyncHandler(async (req, res) => {
    const books = await Book.findAll({
        attributes: ['id', 'title'],
        include: {
            model: User,
            attributes: ['id', 'name'],
            through: {
                model: Borrow,
                attributes: ["dueDate"],
                where: {
                    dueDate: {
                        [Op.lt]: new Date(),
                    },
                },
            },
        },
        where: {
            '$Users.Borrow.id$': {
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


// @desc    Return book
// @route   GET /api/v1/borrow/return-books/:borrowId
// @access  Private/(Admin || Librarian || User who borrowed the book) 

exports.returnBook = asyncHandler(async (req, res) => {
    console.log(req.user, 'req.user');
    const user = await User.findByPk(req.user.id);
    const borrowProcess = await Borrow.findOne({
        where: { id: req.params.borrowId }
    });

    if (!borrowProcess) {
        handleResourceNotFound(req, res);
        return;
    }

    if (borrowProcess.isAuthUserBorrowedThisBook(req.user.id)
        || user.isAdmin()
        || user.isLibrarian()) {

        const book = await Book.findOne({
            where: { id: borrowProcess.BookId }
        })

        await book.increment("availableCopies");
        await borrowProcess.update({ returnDate: new Date() });
        await borrowProcess.save();
        res.status(200).json({
            success: true,
            message: messages.success.RETURN_BOOK,
        })
    } else {
        handleForbidden(req, res, messages.error.FORBIDDEN);
        return;
    }

})


