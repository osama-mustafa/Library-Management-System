const express = require('express');
const router = express.Router();
const {
    borrowBook,
    getAllBorrowers,
    getOverdueBooks,
    returnBook
} = require('../controllers/borrowController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const adminMiddleware = require('../middlwares/adminMiddleware');


router.post('/return-book/:borrowId', authenticationMiddleware, returnBook)
router.post('/:bookId/:userId', authenticationMiddleware, borrowBook);
router.get('/borrowers', authenticationMiddleware, adminMiddleware, getAllBorrowers);
router.get('/overdue-books', authenticationMiddleware, adminMiddleware, getOverdueBooks)

module.exports = router
