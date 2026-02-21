const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'alconcel',
    host: 'localhost',
    port: 5432,
    database: 'capstone'
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = pool;