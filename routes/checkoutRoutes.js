const { borrowBook } = require('../controllers/checkoutController');
const express = require('express');
const router = express.Router();


router.post('/:bookId/:userId', borrowBook);

module.exports = router
