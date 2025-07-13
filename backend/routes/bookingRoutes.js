const express = require('express');
const router = express.Router();
const { Booking } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// ✅ Company: Get bookings with optional status filter
router.get('/company', authenticateToken, async (req, res) => {
  try {
    const where = { companyId: req.user.id };
    if (req.query.status) {
      where.status = req.query.status;
    }

    const bookings = await Booking.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching company bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Vendor: Get bookings assigned to the vendor
router.get('/vendor', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { vendorId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching vendor bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Create a new booking (Company)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      guestName,
      guestPhone,
      guestEmail,
      pickupLocation,
      dropLocation,
      pickupTime,
      vehicleType,
      isOpenMarket,
      notes
    } = req.body;

    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await Booking.create({
      bookingId,
      companyId: req.user.id,
      guestName,
      guestPhone,
      guestEmail,
      pickupLocation,
      dropLocation,
      pickupTime,
      vehicleType,
      isOpenMarket,
      notes
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
});

// ✅ Vendor: Get open market bookings
router.get('/open', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        isOpenMarket: true,
        status: 'pending',
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching open bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Vendor: Accept a booking
router.put('/:id/accept', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (!booking.isOpenMarket || booking.status !== 'pending') {
      return res.status(400).json({ message: 'Booking is not available for acceptance' });
    }

    booking.vendorId = req.user.id;
    booking.status = 'accepted';
    booking.isOpenMarket = false;
    await booking.save();

    res.json({ message: 'Booking accepted successfully', booking });
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ message: 'Server error while accepting booking' });
  }
});
// ✅ Vendor: Get open market bookings (pending + isOpenMarket)
router.get('/open', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        isOpenMarket: true,
        status: 'pending',
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching open bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Vendor: Get accepted bookings
router.get('/vendor/accepted', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        vendorId: req.user.id,
        status: 'accepted'
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching accepted bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Vendor: Mark a booking as completed
router.put('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.vendorId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (booking.status !== 'accepted') {
      return res.status(400).json({ message: 'Only accepted bookings can be completed' });
    }

    booking.status = 'completed';
    booking.dropTime = new Date();
    await booking.save();

    res.json({ message: 'Booking marked as completed', booking });
  } catch (error) {
    console.error('Error completing booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// ✅ Company: Cancel a pending booking
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.companyId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending bookings can be cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
});

module.exports = router;
