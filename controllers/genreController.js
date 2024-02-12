const Genre = require("../models/genre");
const Book = require("../models/book");
const { handleResourceNotFound } = require("../utils/responseHandler");
const messages = require("../utils/messages");
const asyncHandler = require("../middlwares/asyncHandler");


// @desc    Create genre
// @route   POST /api/v1/genres
// @access  Private/(Admin || Librarian)

exports.createGenre = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const genre = await Genre.create({
        name,
        description,
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: genre,
    });
});


// @desc    Get all genres
// @route   GET /api/v1/genres
// @access  Public

exports.getAllGenres = asyncHandler(async (req, res) => {
    const genres = await Genre.findAll();

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: genres.length,
        data: genres,
    });
});


// @desc    Get genre
// @route   GET /api/v1/genres/:id
// @access  Public

exports.getGenre = asyncHandler(async (req, res) => {
    const genre = await Genre.findByPk(req.params.id, {
        include: {
            model: Book,
            attributes: ['id', 'title']
        }
    });

    if (!genre) {
        handleResourceNotFound(req, res);
        return;
    }
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: genre,
    });
});


// @desc    Update genre
// @route   PUT /api/v1/genres/:id
// @access  Private/(Admin || Librarian)

exports.updateGenre = asyncHandler(async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    const { name, description } = req.body;
    if (!genre) {
        handleResourceNotFound(req, res);
        return;
    }
    await genre.update({ name, description });
    await genre.save();
    res.status(200).json({
        success: true,
        message: messages.success.UPDATE_RESOUCRE,
        data: genre,
    });
});


// @desc    Delete genre
// @route   DELETE /api/v1/genres/:id
// @access  Private/(Admin || Librarian)

exports.deleteGenre = asyncHandler(async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
        handleResourceNotFound(req, res);
        return;
    }
    await genre.destroy();
    res.status(200).json({
        success: true,
        message: messages.success.DELETE_RESOURCE,
    });
});
