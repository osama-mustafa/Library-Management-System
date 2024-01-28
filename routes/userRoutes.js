const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUser } = require('../controllers/userController');


router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser)


module.exports = router;