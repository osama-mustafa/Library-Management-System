const express = require('express');
const router = express.Router();
const {
    createAuthor,
    getAllAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const adminMiddleware = require('../middlwares/adminMiddleware');

router.post('/', authenticationMiddleware, adminMiddleware, createAuthor);
router.get('/', authenticationMiddleware, adminMiddleware, getAllAuthors);
router.get('/:id', authenticationMiddleware, adminMiddleware, getAuthor);
router.put('/:id', authenticationMiddleware, adminMiddleware, updateAuthor)
router.delete('/:id', authenticationMiddleware, adminMiddleware, deleteAuthor)

module.exports = router;