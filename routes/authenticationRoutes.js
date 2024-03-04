const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    getAuthenticatedUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    updatePassword } = require('../controllers/authenticationController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const refreshTokenMiddleware = require('../middlwares/refreshTokenMiddleware');
const guestMiddleware = require('../middlwares/guestMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticationMiddleware, getAuthenticatedUser)
router.post('/logout', authenticationMiddleware, logout);
router.post('/refresh-token', refreshTokenMiddleware, refreshToken);
router.post('/reset-password/:token', guestMiddleware, resetPassword);
router.post('/forgot-password', guestMiddleware, forgotPassword);
// router.post('/reset-password/:token', resetPassword);
// router.post('/update-password', updatePassword);

module.exports = router
