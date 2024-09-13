const pool = require('../config/db');

const addItem = async (title, description, price, image_url) => {
  const result = await pool.query(
    'INSERT INTO items (title, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, price, image_url]
  );
  return result.rows[0];
};

const getItems = async () => {
  const result = await pool.query('SELECT * FROM items ORDER BY posted_at DESC');
  return result.rows;
};

module.exports = { addItem, getItems };
