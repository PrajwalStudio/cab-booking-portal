const express = require('express');
const router = express.Router();
const { Driver, Vehicle } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// ✅ Get all drivers for the logged-in vendor
router.get('/drivers', authenticateToken, async (req, res) => {
  try {
    const drivers = await Driver.findAll({ where: { vendorId: req.user.id } });
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Error fetching drivers' });
  }
});

// ✅ Add a new driver
router.post('/drivers', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      licenseNumber,
      aadharNumber,
      panNumber,
      address,
      dateOfJoining,
      salary,
      department,
      bankAccountNumber,
      ifscCode,
      status
    } = req.body;

    // ✅ Generate a unique employeeId (e.g., EMP-5321)
    const employeeId = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDriver = await Driver.create({
      vendorId: req.user.id,
      employeeId, // ✅ Include this
      name,
      phone,
      email,
      licenseNumber,
      aadharNumber,
      panNumber,
      address,
      dateOfJoining,
      salary,
      department,
      bankAccountNumber,
      ifscCode,
      status
    });

    res.status(201).json(newDriver);
  } catch (error) {
    console.error('Error adding driver:', error);
    res.status(500).json({ message: 'Error adding driver' });
  }
});

// ✅ Get all vehicles for the logged-in vendor
router.get('/vehicles', authenticateToken, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { vendorId: req.user.id } });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
});

// ✅ Add a new vehicle
router.post('/vehicles', authenticateToken, async (req, res) => {
  try {
    const {
      plateNumber,
      vehicleType,
      model,
      make,
      year,
      color,
      insuranceExpiry,
      lastService,
      condition,
      availability
    } = req.body;

    const newVehicle = await Vehicle.create({
      vendorId: req.user.id,
      plateNumber,
      vehicleType,
      model,
      make,
      year,
      color,
      insuranceExpiry,
      lastService,
      condition,
      availability
    });

    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error adding vehicle:', error);
    res.status(500).json({ message: 'Error adding vehicle' });
  }
});

module.exports = router;
