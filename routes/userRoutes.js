const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser
} = require('../controllers/userController');


router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser)
router.put('/:id', updateUser)


module.exports = router;