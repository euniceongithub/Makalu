const express = require('express');
const { addItem, getItems } = require('../models/Item');
const router = express.Router();

// Add new item
router.post('/sell', async (req, res) => {
  const { title, description, price, image_url } = req.body;
  try {
    const newItem = await addItem(title, description, price, image_url);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error adding item' });
  }
});

// Get all items (for the buy page)
router.get('/buy', async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

module.exports = router;
