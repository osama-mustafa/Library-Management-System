const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV
const { connectDB } = require('./config/db');
const mountRoutes = require('./routes/index');
const rateLimitMiddleware = require('./middlwares/rateLimitMiddleware');
const helmet = require('helmet')


// Connect to MySQL DB
connectDB();

app.use(express.json());
app.use(rateLimitMiddleware);
app.use(helmet())

mountRoutes(app);

app.listen(port, () => {
    console.log(`Library Management System listening on ${port} port in ${environment} environment`)
})