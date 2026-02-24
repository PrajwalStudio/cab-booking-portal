import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const VendorBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [assignModal, setAssignModal] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    if (user?.role !== 'vendor') return;

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get(`${API_URL}/api/bookings/open`, { headers }),
      axios.get(`${API_URL}/api/vendor/drivers`, { headers }),
      axios.get(`${API_URL}/api/vendor/vehicles`, { headers }),
    ])
      .then(([bookingRes, driverRes, vehicleRes]) => {
        setBookings(bookingRes.data);
        setDrivers(driverRes.data);
        setVehicles(vehicleRes.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        if (err.response?.status === 403) navigate('/login');
      });
  }, [user, navigate]);

  const openAssignModal = (booking) => {
    setAssignModal(booking);
    setSelectedDriver('');
    setSelectedVehicle('');
  };

  const handleAccept = async () => {
    if (!selectedDriver || !selectedVehicle) {
      alert('Please select both a driver and a vehicle');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/api/bookings/${assignModal.id}/accept`,
        { driverId: selectedDriver, vehicleId: selectedVehicle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(bookings.filter((b) => b.id !== assignModal.id));
      setAssignModal(null);
    } catch (err) {
      console.error('Error accepting booking:', err);
      alert(err.response?.data?.message || 'Error accepting booking');
    }
  };

  const availableDrivers = drivers.filter((d) => d.status === 'available');
  const matchingVehicles = assignModal
    ? vehicles.filter((v) => v.availability === 'available' && v.vehicleType === assignModal.vehicleType)
    : [];
  const otherVehicles = assignModal
    ? vehicles.filter((v) => v.availability === 'available' && v.vehicleType !== assignModal.vehicleType)
    : [];

  if (!user || user.role !== 'vendor') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
          <p className="text-center text-red-600 text-lg font-medium">Access Denied</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Available Bookings</h2>
            <p className="text-gray-600 mt-1">Accept ride requests and assign driver &amp; vehicle</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No available bookings</h3>
            <p className="mt-1 text-gray-500">Check back later for new ride requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {booking.bookingId || `#${booking.id.slice(0, 8).toUpperCase()}`}
                    </h3>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      PENDING
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Guest Name</p>
                      <p className="text-sm font-medium text-gray-900">{booking.guestName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Requested</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{booking.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-sm font-medium text-gray-900">{booking.guestPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="text-sm font-medium text-gray-900">{booking.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Drop Location</p>
                      <p className="text-sm font-medium text-gray-900">{booking.dropLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pickup Time</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(booking.pickupTime).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => openAssignModal(booking)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accept &amp; Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {assignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Assign Driver &amp; Vehicle
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {assignModal.bookingId} - {assignModal.guestName} ({assignModal.vehicleType})
                </p>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Driver *
                  </label>
                  <select
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">-- Choose a driver --</option>
                    {availableDrivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.employeeId}) - {d.phone}
                      </option>
                    ))}
                  </select>
                  {availableDrivers.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">No available drivers. Add drivers first.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Vehicle ({assignModal.vehicleType}) *
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">-- Choose a vehicle --</option>
                    {matchingVehicles.length > 0 && (
                      <optgroup label={`Matching: ${assignModal.vehicleType}`}>
                        {matchingVehicles.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.model} - {v.plateNumber} ({v.vehicleType})
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {otherVehicles.length > 0 && (
                      <optgroup label="Other available vehicles">
                        {otherVehicles.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.model} - {v.plateNumber} ({v.vehicleType})
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  {matchingVehicles.length === 0 && otherVehicles.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      No available vehicles. Add vehicles first.
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setAssignModal(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!selectedDriver || !selectedVehicle}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm &amp; Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorBookings;
