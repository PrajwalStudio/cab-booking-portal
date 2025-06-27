import express from 'express';
import pool from '../db'; // Make sure your DB connection is correctly imported

const router = express.Router();

// ✅ GET all bookings with driver info
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.*, 
        d.name AS driver_name 
      FROM bookings b
      LEFT JOIN drivers d ON b.driver_id = d.id
      ORDER BY b.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ✅ POST a new booking
router.post('/', async (req, res) => {
  const {
    guestName,
    guestContact,
    pickupTime,
    dropTime,
    vehicleType,
    companyName,
    pickupLocation,
    dropLocation,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings 
      (guestName, guestContact, pickupTime, dropTime, vehicleType, companyName, pickup_location, drop_location) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        guestName,
        guestContact,
        pickupTime,
        dropTime,
        vehicleType,
        companyName,
        pickupLocation,
        dropLocation,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// ✅ PATCH to assign a driver
router.patch('/:id/driver', async (req, res) => {
  const { id } = req.params;
  const { driver_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE bookings SET driver_id = $1 WHERE id = $2 RETURNING *`,
      [driver_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error assigning driver:', err);
    res.status(500).json({ error: 'Failed to assign driver' });
  }
});

export default router;
