const { borrowBook, getAllBorrowers, getOverdueBooks } = require('../controllers/checkoutController');
const express = require('express');
const router = express.Router();


router.post('/:bookId/:userId', borrowBook);
router.get('/borrowers', getAllBorrowers),
router.get('/overdue-books', getOverdueBooks)

module.exports = router
