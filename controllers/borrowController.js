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
const system = require("../config/system");


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

            // Check if the user borrowed book and return it before
            const isUserBorrowedAndReturnedBookBefore = await Borrow.isUserBorrowedAndReturnedBookBefore(book.id, user.id);
            if (isUserBorrowedAndReturnedBookBefore) {
                const oldBorrowProcess = await Borrow.findOne({
                    where: {
                        UserId: userId,
                        BookId: bookId,
                    }
                }, { transaction: t });

                await oldBorrowProcess.update({
                    returnDate: null,
                    dueDate: new Date(Date.now() + system.RENEWAL_PERIOD),
                    renewed: true
                }, { transaction: t });
                await oldBorrowProcess.increment('renewCount', { transaction: t });
                await oldBorrowProcess.save();

                return res.status(200).json({
                    success: true,
                    message: messages.success.BORROW_BOOK_AGAIN
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
// @route   GET /api/v1/borrow
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
// @access  Private/Admin  

exports.returnBook = asyncHandler(async (req, res) => {
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

});

// @desc    Update borrowing process
// @route   GET /api/v1/borrow/:borrowId
// @access  Private/Admin

exports.updateBorrowProcess = asyncHandler(async (req, res) => {
    const borrowProcess = await Borrow.findByPk(req.params.id);
    const {
        UserId,
        BookId,
        checkoutDate,
        dueDate,
        returnDate,
        renewCount,
        renewed
    } = req.body;

    if (!borrowProcess) {
        handleResourceNotFound(req, res, messages.error.RESOURCE_NOT_FOUND);
        return;
    }

    await borrowProcess.update({
        UserId,
        BookId,
        checkoutDate,
        dueDate,
        returnDate,
        renewCount,
        renewed
    });

    await borrowProcess.save();
    res.status(200).json({
        success: true,
        message: messages.success.UPDATE_RESOUCRE
    });

});


// @desc    Delete borrowing process
// @route   GET /api/v1/borrow/:borrowId
// @access  Private/Admin

exports.deleteBorrowProcess = asyncHandler(async (req, res) => {
    const borrowProcess = await Borrow.findByPk(req.params.id);

    if (!borrowProcess) {
        handleResourceNotFound(req, res, messages.error.RESOURCE_NOT_FOUND);
        return;
    }

    await borrowProcess.destroy();
    res.status(200).json({
        success: true,
        message: messages.success.DELETE_RESOURCE
    });
});


