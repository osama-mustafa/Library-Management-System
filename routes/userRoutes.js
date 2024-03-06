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
const createUserValidator = require('../utils/validators/userValidator')

router.use(authenticationMiddleware, adminMiddleware)

router.post('/', createUserValidator, createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;