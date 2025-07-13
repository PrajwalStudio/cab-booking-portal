const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // ✅ This is important

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import your routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const vendorRoutes = require('./routes/vendorRoutes');

// ✅ Use your routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vendor', vendorRoutes);

// ✅ Sync Sequelize models with DB
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ DB synced');
  
  // ✅ Start the server only after syncing
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to sync database:', err);
});
