const Author = require('../models/author');
const handleResourceNotFound = require('../utils/responseHandler');
const messages = require('../utils/messages');


// @desc    Create author
// @route   POST /api/v1/authors
// @access  Private/Admin

exports.createAuthor = async (req, res) => {
    const { name, nationality, biography } = req.body;
    const user = await Author.create({
        name, nationality, biography
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: user
    });
}


// @desc    Get all authors
// @route   GET /api/v1/authors
// @access  Private/Admin

exports.getAllAuthors = async (req, res) => {
    const authors = await Author.findAll();

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        length: authors.length,
        data: authors
    });
}


// @desc    Get author
// @route   GET /api/v1/authors/:id
// @access  Private/Admin

exports.getAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (!author) { handleResourceNotFound(req, res) }
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: author
    });
}


// @desc    Update author
// @route   PUT /api/v1/authors/:id
// @access  Private/Admin

exports.updateAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    const { name, email } = req.body;
    if (!author) { handleResourceNotFound(req, res) }
    await author.update({
        name, email
    });
    await author.save();
    res.status(200).json({
        success: true,
        message: messages.success.UPDATE_RESOUCRE,
        data: author
    });
}


// @desc    Delete author
// @route   DELETE /api/v1/authors/:id
// @access  Private/Admin

exports.deleteAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (!author) { handleResourceNotFound(req, res) }
    await author.destroy();
    res.status(200).json({
        success: true,
        message: messages.success.DELETE_RESOURCE,
    });
}