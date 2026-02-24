import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const TABS = [
  { key: 'accepted', label: 'Upcoming' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const VendorAcceptedBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('accepted');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/bookings/vendor/accepted`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        if (err.response?.status === 403) navigate('/login');
      }
    };

    if (user?.role === 'vendor') fetchBookings();
  }, [user, navigate]);

  const handleStartTrip = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/bookings/${bookingId}/start`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'ongoing' } : b))
      );
    } catch (err) {
      console.error('Error starting trip:', err);
      alert(err.response?.data?.message || 'Failed to start trip');
    }
  };

  const handleEndTrip = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/bookings/${bookingId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'completed', dropTime: new Date().toISOString() } : b))
      );
    } catch (err) {
      console.error('Error ending trip:', err);
      alert(err.response?.data?.message || 'Failed to end trip');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-600';
      case 'ongoing': return 'bg-orange-500';
      case 'completed': return 'bg-green-600';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTabStyle = (tabKey) => {
    if (activeTab !== tabKey) return 'text-gray-500 hover:text-gray-700 hover:bg-gray-50';
    switch (tabKey) {
      case 'accepted': return 'bg-blue-50 text-blue-700 border-b-2 border-blue-600';
      case 'ongoing': return 'bg-yellow-50 text-yellow-700 border-b-2 border-yellow-600';
      case 'completed': return 'bg-green-50 text-green-700 border-b-2 border-green-600';
      case 'cancelled': return 'bg-red-50 text-red-700 border-b-2 border-red-600';
      default: return '';
    }
  };

  const getBadgeStyle = (tabKey) => {
    if (activeTab !== tabKey) return 'bg-gray-100 text-gray-600';
    switch (tabKey) {
      case 'accepted': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return '';
    }
  };

  const filteredBookings = bookings.filter((b) => b.status === activeTab);
  const getTabCount = (status) => bookings.filter((b) => b.status === status).length;

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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
            <p className="text-gray-600 mt-1">Manage your accepted and ongoing trips</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${getTabStyle(tab.key)}`}
              >
                {tab.label}
                <span className={`ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeStyle(tab.key)}`}>
                  {getTabCount(tab.key)}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No {activeTab} bookings</h3>
            <p className="mt-1 text-gray-500">Bookings with this status will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {booking.bookingId || `#${booking.id.slice(0, 8).toUpperCase()}`}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)} text-white`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Guest Name</p>
                      <p className="text-sm font-medium text-gray-900">{booking.guestName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-sm font-medium text-gray-900">{booking.guestPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{booking.vehicleType}</p>
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
                    {booking.dropTime && (
                      <div>
                        <p className="text-sm text-gray-500">Drop Time</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(booking.dropTime).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {booking.status === 'accepted' && (
                    <div className="mt-5 flex justify-end">
                      <button
                        onClick={() => handleStartTrip(booking.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Start Trip
                      </button>
                    </div>
                  )}

                  {booking.status === 'ongoing' && (
                    <div className="mt-5 flex justify-end">
                      <button
                        onClick={() => handleEndTrip(booking.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                        End Trip
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorAcceptedBookings;
