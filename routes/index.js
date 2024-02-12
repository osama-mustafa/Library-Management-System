const userRoutes = require('./userRoutes');
const genreRoutes = require('./genreRoutes');
const authorRoutes = require('./authorRoutes');
const bookRoutes = require('./bookRoutes');
const borrowRoutes = require('./borrowRoutes');
const authenticationRoutes = require('./authenticationRoutes');
const profileRoutes = require('./profileRoutes');

const mountRoutes = (app) => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/authors', authorRoutes);
    app.use('/api/v1/books', bookRoutes);
    app.use('/api/v1/borrow', borrowRoutes);
    app.use('/api/v1/profile', profileRoutes);
    app.use('/api/v1/genres', genreRoutes);
    app.use('/api/v1/auth', authenticationRoutes)
}

module.exports = mountRoutes;
