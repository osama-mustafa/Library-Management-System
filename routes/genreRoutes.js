const express = require('express');
const router = express.Router();
const {
    createGenre,
    getAllGenres,
    getGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genreController');
const authenticationMiddleware = require('../middlwares/authenticationMiddleware');
const librarianMiddleware = require('../middlwares/librarianMiddleware');

router.post('/', authenticationMiddleware, librarianMiddleware, createGenre);
router.get('/', authenticationMiddleware, librarianMiddleware, getAllGenres);
router.get('/:id', getGenre);
router.put('/:id', authenticationMiddleware, librarianMiddleware, updateGenre);
router.delete('/:id', authenticationMiddleware, librarianMiddleware, deleteGenre);

module.exports = router;