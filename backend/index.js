const express = require('express');
const cors = require('cors'); // Import CORS
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // For parsing form data

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
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

// Example route to check the database query
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

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file
  },
});

const upload = multer({ storage: storage });

// API route for submitting new item (from Sell Page)
app.post('/api/sell', upload.single('picture'), (req, res) => {
  const { itemName, description, keywords, location } = req.body;
  const picture = req.file ? req.file.filename : null;

  // Insert item details into the database
  pool.query(
    'INSERT INTO items (name, description, picture, keywords, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [itemName, description, picture, keywords, location]
  )
    .then(result => {
      res.json({ message: 'Item added successfully', item: result.rows[0] });
    })
    .catch(err => {
      console.error('Error inserting item:', err.stack);
      res.status(500).json({ message: 'Error adding item' });
    });
});

// Close the pool on process exit
process.on('exit', () => {
  pool.end();
});
