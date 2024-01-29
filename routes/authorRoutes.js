const express = require('express');
const router = express.Router();
const {
    createAuthor,
    getAllAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');

router.post('/', createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthor);
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

module.exports = router;