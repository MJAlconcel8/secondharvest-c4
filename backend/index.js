const express = require('express');
const cors = require('cors');
const pool = require('./config/userConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

