const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connectDB } = require('./config/db');
const mountRoutes = require('./routes/index');
const rateLimitMiddleware = require('./middlwares/rateLimitMiddleware');


// Connect to MySQL DB
connectDB();

app.use(express.json());
app.use(rateLimitMiddleware);
mountRoutes(app);

app.listen(port, () => {
    console.log(`Library Management System listening on port ${port}`)
})