import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookCab from './pages/BookCab';
import CompanyBookings from './pages/CompanyBookings';
import VendorBookings from './pages/VendorBookings'; // ✅ Available bookings
import VendorAcceptedBookings from './pages/VendorAcceptedBookings'; // ✅ Accepted bookings
import VendorDrivers from './pages/VendorDrivers';
import VendorVehicles from './pages/VendorVehicles';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        
        {/* Company Routes */}
        <Route path="/book-cab" element={user?.role === 'company' ? <BookCab /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={user?.role === 'company' ? <CompanyBookings /> : <Navigate to="/login" />} />
        
        {/* Vendor Routes */}
        <Route path="/vendor/bookings" element={user?.role === 'vendor' ? <VendorBookings /> : <Navigate to="/login" />} />
        <Route path="/vendor/accepted" element={user?.role === 'vendor' ? <VendorAcceptedBookings /> : <Navigate to="/login" />} />
        <Route path="/vendor/drivers" element={user?.role === 'vendor' ? <VendorDrivers /> : <Navigate to="/login" />} />
        <Route path="/vendor/vehicles" element={user?.role === 'vendor' ? <VendorVehicles /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
