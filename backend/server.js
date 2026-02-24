const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const vendorRoutes = require('./routes/vendorRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vendor', vendorRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log('DB synced');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
