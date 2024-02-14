const express = require('express');
const router = express.Router();
const {
    borrowBook,
    getAllBorrowers,
    getOverdueBooks,
    returnBook,
    updateBorrowProcess,
    deleteBorrowProcess
} = require('../controllers/borrowController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const adminMiddleware = require('../middlwares/adminMiddleware');
const librarianMiddleware = require('../middlwares/librarianMiddleware');



router.post('/return-book/:borrowId', authenticationMiddleware, returnBook)
router.post('/:bookId/:userId', authenticationMiddleware, borrowBook);
router.get('/overdue-books', authenticationMiddleware, adminMiddleware, getOverdueBooks)
router.get('/', authenticationMiddleware, librarianMiddleware, getAllBorrowers);
router.put('/:id', authenticationMiddleware, librarianMiddleware, updateBorrowProcess);
router.delete('/:id', authenticationMiddleware, librarianMiddleware, deleteBorrowProcess);


module.exports = router
