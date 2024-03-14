const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV
const { connectDB } = require('./config/db');
const mountRoutes = require('./routes/index');
const rateLimitMiddleware = require('./middlwares/rateLimitMiddleware');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const hpp = require('hpp');



// Connect to MySQL DB
connectDB();

// Parse application/json
app.use(express.json({ limit: '20kb' }));

// Enable rate limiting
app.use(rateLimitMiddleware);

// Use Helmet middleware for security
app.use(helmet());

// Middleware to Protect against HTTP Parameter Pollution Attacks
app.use(hpp());

// Load Routes
mountRoutes(app);

// Swagger UI Express for API documentation
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(swaggerFile)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`Library Management System listening on ${port} port in ${environment} environment`)
})