const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const adminMiddleware = require('../middlwares/adminMiddleware');
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');


router.post('/', authenticationMiddleware, adminMiddleware, createUser);
router.get('/', authenticationMiddleware, adminMiddleware, getAllUsers);
router.get('/:id', authenticationMiddleware, adminMiddleware, getUser)
router.put('/:id', authenticationMiddleware, adminMiddleware, updateUser)
router.delete('/:id', authenticationMiddleware, adminMiddleware, deleteUser)

module.exports = router;