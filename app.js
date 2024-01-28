const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');


connectDB();

// for parsing application/json
app.use(express.json());


app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`Library Management System listening on port ${port}`)
})