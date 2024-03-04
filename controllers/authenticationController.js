const asyncHandler = require("../middlwares/asyncHandler");
const User = require('../models/user');
const messages = require('../utils/messages');
const { handleNotAuthorized } = require("../utils/responseHandler");
const { generateRandomToken, storeToken, isValidToken, setNewPassword } = require('../utils/resetPassword');
const sendEmail = require('../utils/sendEmail');



exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.create({ name, email, password });
    let token = await user.generateAccessToken();

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
            const accessToken = await user.generateAccessToken();
            const refreshToken = await user.generateRefreshToken();
            await user.save()
            res.status(200).json({
                success: true,
                message: messages.success.USER_LOGIN,
                data: user,
                accessToken, refreshToken
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
    return res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: user
    })
});

exports.logout = asyncHandler(async (req, res) => {
    const token = req.token;
    let user = await User.findByPk(req.user.id);
    user.revokeAccessToken(token);

    return res.status(200).json({
        success: true,
        message: messages.success.USER_LOGOUT
    });

});

exports.refreshToken = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const oldRefreshToken = req.refreshToken;
    const oldAccessToken = req.accessToken
    const newAccessToken = await user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();
    await user.revokeRefreshToken(oldRefreshToken);
    await user.revokeAccessToken(oldAccessToken)
    res.status(200).json({
        success: true,
        message: messages.success.REFRESH_TOKEN,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    });

});


exports.forgotPassword = asyncHandler(async (req, res) => {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: messages.error.INVALID_CREDENTIALS
        });
    }
    const token = await generateRandomToken();
    await storeToken(token, user.id);
    const resetPasswordURL = `http://${req.hostname}:${process.env.PORT}/api/v1/auth/reset-password/${token}`;
    let htmlMessage = `
                <h2>Hello</h2><br>
                <h2>Follow this URL to reset password</h2><br>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
    `
    const options = {
        sender: process.env.EMAIL_SENEDER,
        receiver: req.body.email,
        html: htmlMessage
    }
    await sendEmail(options);
    res.status(200).json({
        success: true,
        message: messages.success.FORGOT_PASSWORD
    });

});

exports.resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = req.params.token;
    const isResetTokenValid = await isValidToken(resetPasswordToken);
    if (isResetTokenValid) {
        await setNewPassword(resetPasswordToken, req.body.password);
        return res.status(200).json({
            success: true,
            message: messages.success.RESET_PASSWORD
        });
    }
    return res.status(400).json({
        success: false,
        message: messages.error.INVALID_RESET_PASSWORD_TOKEN
    });
});

exports.Password = asyncHandler(async (req, res) => {

});
