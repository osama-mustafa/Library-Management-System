const Checkout = require('../models/checkout');
const asyncHandler = require('../middlwares/asyncHandler');


// @desc    Borrow book
// @route   DELETE /api/v1/borrowing/:bookId/:userId
// @access  Private/User

exports.borrowBook = asyncHandler(async (req, res) => {

});