'use client';

import { useEffect, useState } from 'react';
import { BarChart, Users, CarFront } from 'lucide-react';

type VehicleSummary = {
  vehicle_type: string;
  count: number;
};

type SummaryData = {
  totalBookings: number;
  totalDrivers: number;
  bookingsByVehicle: VehicleSummary[];
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/summary');
        if (!res.ok) throw new Error('Failed to fetch summary');
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error('❌ Dashboard error:', err);
        setError('Could not load dashboard data.');
      }
    };
    fetchSummary();
  }, []);

  if (error) {
    return <div className="p-6 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">📊 Admin Dashboard</h1>

        {summary ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border-t-4 border-blue-600 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 uppercase text-xs font-semibold">Total Bookings</h2>
                <p className="text-3xl font-bold text-blue-700 mt-2">{summary.totalBookings}</p>
              </div>
              <BarChart className="w-10 h-10 text-blue-600" />
            </div>

            <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border-t-4 border-green-600 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 uppercase text-xs font-semibold">Total Drivers</h2>
                <p className="text-3xl font-bold text-green-700 mt-2">{summary.totalDrivers}</p>
              </div>
              <Users className="w-10 h-10 text-green-600" />
            </div>

            <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border-t-4 border-purple-600">
              <h2 className="text-gray-500 uppercase text-xs font-semibold text-center mb-4">Bookings by Vehicle</h2>
              <ul className="space-y-2">
                {summary.bookingsByVehicle.map((item) => (
                  <li
                    key={item.vehicle_type}
                    className="flex justify-between items-center text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <CarFront className="w-4 h-4 text-purple-500" />
                      {item.vehicle_type}
                    </span>
                    <span className="font-semibold text-purple-700">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12 text-lg">Loading summary...</p>
        )}
      </div>
    </div>
  );
}
