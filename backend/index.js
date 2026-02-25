const express = require('express');
const cors = require('cors');
const pool = require('./config/userConfig');
const userRoutes = require('./routes/userRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const environment = require('./config/environment');

const app = express();

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (environment.CORS_ORIGIN.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true
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

app.listen(environment.PORT, () => {
    console.log(`Server is running on port ${environment.PORT} in ${environment.NODE_ENV} mode`);
});

