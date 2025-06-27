import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import bookingRoutes from './routes/bookingRoutes';
import driverRoutes from './routes/driverRoutes';
import summaryRoutes from './routes/summaryRoutes';
import assignRoutes from './routes/assignRoutes'; // ✅ New import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/assignments', assignRoutes); // ✅ New route added

// Root test route
app.get('/', (_req, res) => {
  res.send('✅ API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
