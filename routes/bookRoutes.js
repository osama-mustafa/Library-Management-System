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
const guestMiddleware = require('../middlwares/guestMiddleware');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');

router.get('/available', guestMiddleware, getAvailableBooks);
router.get('/', guestMiddleware, getAllBooks);
router.get('/search', searchBooks);
router.post('/', authenticationMiddleware, createBook);
router.get('/:id', authenticationMiddleware, getBook);
router.put('/:id', authenticationMiddleware, updateBook)
router.delete('/:id', authenticationMiddleware, deleteBook)


module.exports = router;