const { Booking } = require('../models');
const { v4: uuidv4 } = require('uuid');

const createBooking = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can book cabs' });
    }

    const {
      guestName,
      guestPhone,
      guestEmail,
      pickupLocation,
      dropLocation,
      pickupTime,
      vehicleType,
      notes
    } = req.body;

    const booking = await Booking.create({
      bookingId: `BK-${uuidv4().slice(0, 8)}`,
      companyId: req.user.id,
      guestName,
      guestPhone,
      guestEmail,
      pickupLocation,
      dropLocation,
      pickupTime,
      vehicleType,
      notes,
      status: 'pending'
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error while booking' });
  }
};

module.exports = { createBooking };
