const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'triple_triad',
  password: process.env.PGPASSWORD || 'marko',
  port: process.env.PGPORT || 5432,
});

// GET /api/cards - fetch all cards
router.get('/cards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cards ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ error: 'Server error fetching cards' });
  }
});

// GET /api/cards/:id - fetch a specific card by ID
router.get('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cards WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching card ${id}:`, err);
    res.status(500).json({ error: 'Server error fetching card' });
  }
});

// POST /api/cards - add a new card
router.post('/cards', async (req, res) => {
  const {
    name,
    rarity,
    rank,
    top_value,
    right_value,
    bottom_value,
    left_value,
    patch,
    image_url,
  } = req.body;

  try {
    const insertQuery = `
      INSERT INTO cards
        (name, rarity, rank, top_value, right_value, bottom_value, left_value, patch, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `;
    const values = [
      name,
      rarity,
      rank,
      top_value,
      right_value,
      bottom_value,
      left_value,
      patch,
      image_url,
    ];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating card:', err);
    res.status(500).json({ error: 'Server error creating card' });
  }
});

// DELETE /api/cards - delete all cards
router.delete('/cards', async (req, res) => {
  try {
    await pool.query('DELETE FROM cards');
    res.json({ message: 'All cards deleted' });
  } catch (err) {
    console.error('Error deleting cards:', err);
    res.status(500).json({ error: 'Server error deleting cards' });
  }
});

// DELETE /api/cards/:id - delete a specific card by ID
router.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM cards WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json({ message: `Card ${id} deleted`, card: result.rows[0] });
  } catch (err) {
    console.error(`Error deleting card ${id}:`, err);
    res.status(500).json({ error: 'Server error deleting card' });
  }
});

module.exports = router;
