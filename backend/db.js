const { Pool } = require('pg');

const pool = new Pool({
  user: 'makalu_user',     // Replace with your DB user
  host: 'localhost',
  database: 'makalu_db',   // Replace with your DB name
  password: 'needtolive', // Replace with your DB password
  port: 5432,              // Default PostgreSQL port
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = pool;
