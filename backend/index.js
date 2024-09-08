const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the database connection
pool.connect()
  .then(() => {
    const connectionTime = new Date().toISOString();
    console.log(`Connected to the database successfully at ${connectionTime}`);

    // Start the server only after a successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Connection error:', err.stack);
  });

  // Simple API route
app.get('/', (req, res) => {
    res.send('Makalu Backend API');
  });

// Sample route to check database query
app.get('/time', (req, res) => {
  pool.query('SELECT NOW()')
    .then(result => {
      res.json({ currentTime: result.rows[0] });
    })
    .catch(err => {
      console.error('Query error:', err.stack);
      res.status(500).send('Database query failed');
    });
});

// Close the pool on process exit
process.on('exit', () => {
  pool.end();
});