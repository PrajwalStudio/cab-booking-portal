import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
          <p className="text-center text-red-600 text-lg font-medium">Access Denied</p>
          <p className="text-center text-gray-600 mt-2">Please login to continue</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.name}!</h1>
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            {user.role.toUpperCase()}
          </span>
        </div>

        {user.role === 'company' && (
          <div className="space-y-3">
            <button
              onClick={() => navigate('/book-cab')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-sm hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Book a Cab
            </button>

            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My Bookings
            </button>
          </div>
        )}

        {user.role === 'vendor' && (
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => navigate('/vendor/bookings')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg shadow-sm hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Available Bookings
            </button>

            <button
              onClick={() => navigate('/vendor/accepted')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Accepted Bookings
            </button>

            <button
              onClick={() => navigate('/vendor/drivers')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-sm hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Drivers
            </button>

            <button
              onClick={() => navigate('/vendor/vehicles')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              View Vehicles
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
