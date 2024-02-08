const asyncHandler = require("../middlwares/asyncHandler");
const User = require('../models/user');
const messages = require('../utils/messages');
const { handleNotAuthorized } = require("../utils/responseHandler");


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
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        const isPasswordValid = user.isPasswordsMatched(req.body.password);
        if (isPasswordValid) {
            let token = await user.generateSignedJwtToken();
            await user.save()
            res.status(200).json({
                success: true,
                message: messages.success.USER_LOGIN,
                data: user,
                token
            });
        } else {
            handleNotAuthorized(req, res, messages.error.INVALID_CREDENTIALS);
            return;
        }
    } else {
        handleNotAuthorized(req, res, messages.error.INVALID_CREDENTIALS);
    }
});

exports.getAuthenticatedUser = asyncHandler(async (req, res) => {
    let user = await User.findByPk(req.user.id);
    if (!user) {
        handleNotAuthorized(req, res, messages.error.NOT_AUTHORIZED);
        return;
    }
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: user
    })
});

exports.logout = asyncHandler(async (req, res) => {

});

exports.forgotPassword = asyncHandler(async (req, res) => {

});

exports.resetPassword = asyncHandler(async (req, res) => {

});

exports.resetPassword = asyncHandler(async (req, res) => {

});
