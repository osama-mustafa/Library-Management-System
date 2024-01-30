const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');


connectDB();

// for parsing application/json
app.use(express.json());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/authors', authorRoutes)
app.use('/api/v1/books', bookRoutes)

app.listen(port, () => {
    console.log(`Library Management System listening on port ${port}`)
})