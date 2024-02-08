const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    getAuthenticatedUser,
    forgotPassword,
    resetPassword,
    updatePassword } = require('../controllers/authenticationController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticationMiddleware, getAuthenticatedUser)
// router.post('/logout', logout);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);
// router.post('/update-password', updatePassword);

module.exports = router
