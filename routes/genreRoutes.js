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
const { createGenreValidator, updateGenreValidator } = require('../utils/validators/genreValidator');

router.post('/', authenticationMiddleware, librarianMiddleware, createGenreValidator, createGenre);
router.get('/', getAllGenres);
router.get('/:id', getGenre);
router.put('/:id', authenticationMiddleware, librarianMiddleware, updateGenreValidator, updateGenre);
router.delete('/:id', authenticationMiddleware, librarianMiddleware, deleteGenre);

module.exports = router;