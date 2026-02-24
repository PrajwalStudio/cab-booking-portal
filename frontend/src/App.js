import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookCab from './pages/BookCab';
import CompanyBookings from './pages/CompanyBookings';
import VendorBookings from './pages/VendorBookings';
import VendorAcceptedBookings from './pages/VendorAcceptedBookings';
import VendorDrivers from './pages/VendorDrivers';
import VendorVehicles from './pages/VendorVehicles';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

        <Route path="/book-cab" element={user?.role === 'company' ? <BookCab /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={user?.role === 'company' ? <CompanyBookings /> : <Navigate to="/login" />} />

        <Route path="/vendor/bookings" element={user?.role === 'vendor' ? <VendorBookings /> : <Navigate to="/login" />} />
        <Route path="/vendor/accepted" element={user?.role === 'vendor' ? <VendorAcceptedBookings /> : <Navigate to="/login" />} />
        <Route path="/vendor/drivers" element={user?.role === 'vendor' ? <VendorDrivers /> : <Navigate to="/login" />} />
        <Route path="/vendor/vehicles" element={user?.role === 'vendor' ? <VendorVehicles /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
