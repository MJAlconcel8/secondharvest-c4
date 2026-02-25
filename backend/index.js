const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/userConfig');
const userRoutes = require('./routes/userRoutes');
const eventsRoutes = require('./routes/eventsRoutes');

const app = express();

// CORS Configuration
// Environment variable origins (trim whitespace)
const envOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0);

// Local development origins for testing
const localOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:3000'
];

// Production origins
const productionOrigins = [
    'https://secondharvest-c4.onrender.com',
    'https://backend-7gk2.onrender.com'
];

// Combine all allowed origins
const allowedOrigins = [
    ...new Set([...envOrigins, ...localOrigins, ...productionOrigins])
];

console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            console.warn(`CORS blocked origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));


// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Database connected successfully');
    }
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/events', eventsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

