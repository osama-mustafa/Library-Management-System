const Book = require('../models/book');
const handleResourceNotFound = require('../utils/responseHandler');
const messages = require('../utils/messages');
const asyncHandler = require('../middlwares/asyncHandler');
const User = require('../models/user');


// @desc    Create book
// @route   POST /api/v1/books
// @access  Private/Admin

exports.createBook = asyncHandler(async (req, res) => {
    const { title, authorId, ISBN, availableCopies, shelfLocation } = req.body;
    const book = await Book.create({
        title, authorId, ISBN, availableCopies, shelfLocation
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: book
    });
})


// @desc    Get all books
// @route   GET /api/v1/books
// @access  Private/Admin

exports.getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.findAll();

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: books.length,
        data: books
    });
});


// @desc    Get book
// @route   GET /api/v1/books/:id
// @access  Private/Admin

exports.getBook = asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id, {
        include: {
            model: User,
        }
    });

    if (!book) {
        handleResourceNotFound(req, res);
        return;
    }
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: book
    });
});


// @desc    Update book
// @route   PUT /api/v1/books/:id
// @access  Private/Admin

exports.updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    const { title, authorId, ISBN, availableCopies, shelfLocation } = req.body;
    if (!book) {
        handleResourceNotFound(req, res);
        return;
    }
    await book.update({
        title,
        authorId,
        ISBN,
        availableCopies,
        shelfLocation
    });
    await book.save();
    res.status(200).json({
        success: true,
        message: messages.success.UPDATE_RESOUCRE,
        data: book
    });
})


// @desc    Delete book
// @route   DELETE /api/v1/books/:id
// @access  Private/Admin

exports.deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
        handleResourceNotFound(req, res);
        return;
    }
    await book.destroy();
    res.status(200).json({
        success: true,
        message: messages.success.DELETE_RESOURCE,
    });
})