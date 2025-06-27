'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  guestname: string;
  pickuplocation: string;
  droplocation: string;
};

type Driver = {
  id: number;
  name: string;
};

export default function AssignPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch('http://localhost:5000/api/assignments/unassigned');
    const data = await res.json();
    setBookings(data);
  };

  const fetchDrivers = async () => {
    const res = await fetch('http://localhost:5000/api/assignments/drivers');
    const data = await res.json();
    setDrivers(data);
  };

  const handleAssign = async (bookingId: number) => {
    const driverId = selectedDrivers[bookingId];
    if (!driverId) return alert('Please select a driver.');

    const res = await fetch('http://localhost:5000/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: bookingId, driver_id: driverId }),
    });

    if (res.ok) {
      alert('✅ Driver assigned!');
      fetchBookings(); // refresh list
    } else {
      const err = await res.json();
      alert('❌ ' + err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Assign Drivers to Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">✅ All bookings are assigned!</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white shadow rounded-lg p-5 border">
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                  <p className="font-semibold">Guest: {booking.guestname}</p>
                  <p className="text-sm text-gray-600">
                    From: {booking.pickuplocation} → To: {booking.droplocation}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <select
                    onChange={(e) =>
                      setSelectedDrivers((prev) => ({
                        ...prev,
                        [booking.id]: Number(e.target.value),
                      }))
                    }
                    defaultValue=""
                    className="border p-2 rounded w-full sm:w-1/2"
                  >
                    <option value="" disabled>
                      Select driver
                    </option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAssign(booking.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
