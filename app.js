const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connectDB } = require('./config/db');
const mountRoutes = require('./routes/index')


// Connect to MySQL DB
connectDB();

// Parsing application/json
app.use(express.json());

// Load Routes
mountRoutes(app);

app.listen(port, () => {
    console.log(`Library Management System listening on port ${port}`)
})