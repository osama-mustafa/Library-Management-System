const express = require('express');
const router = express.Router();
const { getBorrowedBooks } = require('../controllers/profileController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');



router.get('/borrowed-books', authenticationMiddleware, getBorrowedBooks);


module.exports = router;