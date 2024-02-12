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
const librarianMiddleware = require('../middlwares/librarianMiddleware');

router.post('/', authenticationMiddleware, librarianMiddleware, createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthor);
router.put('/:id', authenticationMiddleware, librarianMiddleware, updateAuthor)
router.delete('/:id', authenticationMiddleware, librarianMiddleware, deleteAuthor)

module.exports = router;