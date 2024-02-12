const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
    getAvailableBooks,
    searchBooks
} = require('../controllers/bookController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const librarianMiddleware = require('../middlwares/librarianMiddleware');

router.get('/available', getAvailableBooks);
router.get('/search', searchBooks);
router.get('/', getAllBooks);
router.post('/', authenticationMiddleware, librarianMiddleware, createBook);
router.get('/:id', getBook);
router.put('/:id', authenticationMiddleware, librarianMiddleware, updateBook)
router.delete('/:id', authenticationMiddleware, librarianMiddleware, deleteBook)

module.exports = router;