const User = require('../models/user');
const handleResourceNotFound = require('../utils/responseHandler');
const messages = require('../utils/messages');


// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: user
    });
}


// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();

    res.status(201).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        data: users
    });
}

// @desc    Get user with id
// @route   GET /api/v1/users/:id
// @access  Private/Admin

exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: user
    });
}


// @desc    Update user with id
// @route   PUT /api/v1/users/:id
// @access  Private/Admin

exports.updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const { name, email } = req.body;
    if (!user) { handleResourceNotFound(req, res) }
    await user.update({
        name, email
    });
    await user.save();
    res.status(200).json({
        success: true,
        message: messages.success.UPDATE_RESOUCRE,
        data: user
    });
}