import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { booking_id, driver_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO assignments (booking_id, driver_id) VALUES ($1, $2) RETURNING *',
      [booking_id, driver_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
