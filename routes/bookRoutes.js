const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
    getAvailableBooks
} = require('../controllers/bookController');

router.get('/available', getAvailableBooks);
router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBook);
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)


module.exports = router;