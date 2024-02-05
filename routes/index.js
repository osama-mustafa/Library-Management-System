const userRoutes = require('./userRoutes');
const authorRoutes = require('./authorRoutes');
const bookRoutes = require('./bookRoutes');
const borrowRoutes = require('./borrowRoutes');

const mountRoutes = (app) => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/authors', authorRoutes);
    app.use('/api/v1/books', bookRoutes);
    app.use('/api/v1/borrow', borrowRoutes);
}

module.exports = mountRoutes;
