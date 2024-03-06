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

router.use(authenticationMiddleware, adminMiddleware)

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;