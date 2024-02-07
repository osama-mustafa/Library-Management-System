const asyncHandler = require("../middlwares/asyncHandler");
const User = require('../models/user');
const messages = require('../utils/messages');


exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.create({ name, email, password });
    let token = await user.generateSignedJwtToken();

    res.status(200).json({
        success: true,
        message: messages.success.USER_REGISTRED,
        data: user,
        token
    });
});

exports.login = asyncHandler(async (req, res) => {

});

exports.getAuthenticatedUser = asyncHandler(async (req, res) => {

});

exports.logout = asyncHandler(async (req, res) => {

});

exports.forgotPassword = asyncHandler(async (req, res) => {

});

exports.resetPassword = asyncHandler(async (req, res) => {

});

exports.resetPassword = asyncHandler(async (req, res) => {

});
