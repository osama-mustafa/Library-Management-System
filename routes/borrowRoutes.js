const express = require('express');
const router = express.Router();
const {
    borrowBook,
    getAllBorrowers,
    getOverdueBooks,
    returnBook
} = require('../controllers/borrowController');


router.post('/return-book/:borrowId', returnBook)
router.post('/:bookId/:userId', borrowBook);
router.get('/borrowers', getAllBorrowers);
router.get('/overdue-books', getOverdueBooks)

module.exports = router
