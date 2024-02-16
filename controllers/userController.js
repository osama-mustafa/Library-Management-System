const User = require('../models/user');
const handleResourceNotFound = require('../utils/responseHandler');
const messages = require('../utils/messages');
const asyncHandler = require('../middlwares/asyncHandler');
const Book = require('../models/book');
const FilterAPI = require('../utils/filterAPI')


// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin

exports.createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: user
    });
})


// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin

exports.getAllUsers = asyncHandler(async (req, res) => {
    const filterAPI = new FilterAPI(User, req.query);
    const users = await filterAPI.select().sort().paginate();


    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: users.length,
        data: users
    });
})

// exports.getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.findAll();


//     res.status(200).json({
//         success: true,
//         message: messages.success.GET_RESOURCES,
//         length: users.length,
//         data: users
//     });
// })



// @desc    Get user
// @route   GET /api/v1/users/:id
// @access  Private/Admin

exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [Book]
    });
    if (!user) { handleResourceNotFound(req, res) }
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: user
    });
})


// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const { name, email, role } = req.body;
    if (!user) {
        handleResourceNotFound(req, res);
        return;
    }
    await user.update({
        name, email, role
    });
    await user.save();
    res.status(200).json({
        success: true,
        message: messages.success.UPDATE_RESOUCRE,
        data: user
    });
})


// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        handleResourceNotFound(req, res);
        return;
    }
    await user.destroy();
    res.status(200).json({
        success: true,
        message: messages.success.DELETE_RESOURCE,
    });
})