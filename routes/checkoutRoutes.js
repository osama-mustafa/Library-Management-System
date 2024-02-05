const { borrowBook, getAllBorrowers } = require('../controllers/checkoutController');
const express = require('express');
const router = express.Router();


router.post('/:bookId/:userId', borrowBook);
router.get('/borrowers', getAllBorrowers)

module.exports = router
