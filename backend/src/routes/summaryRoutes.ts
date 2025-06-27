import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const totalBookings = await pool.query('SELECT COUNT(*) FROM bookings');
    const totalDrivers = await pool.query('SELECT COUNT(*) FROM drivers');
    const bookingsByVehicle = await pool.query(`
      SELECT vehicle_type, COUNT(*) FROM bookings GROUP BY vehicle_type
    `);

    res.json({
      totalBookings: parseInt(totalBookings.rows[0].count),
      totalDrivers: parseInt(totalDrivers.rows[0].count),
      bookingsByVehicle: bookingsByVehicle.rows
    });
  } catch (err) {
    console.error('❌ ERROR in /api/summary:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
