import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST /api/drivers - Add a new driver
router.post('/', async (req, res) => {
  const { name, phone } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO drivers (name, phone) VALUES ($1, $2) RETURNING *',
      [name, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding driver:', err);
    res.status(500).json({ error: 'Failed to add driver' });
  }
});

// GET /api/drivers - List all drivers
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drivers ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching drivers:', err);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

export default router;
