'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  guestname: string;
  guestcontact: string;
  pickup_location: string;
  drop_location: string;
  pickup_time: string;
  drop_time: string;
  vehicle_type: string;
  companyname: string;
  driver_id?: number;
  driver_name?: string;
};

type Driver = {
  id: number;
  name: string;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch('http://localhost:5000/api/bookings');
    const data = await res.json();
    setBookings(data);
  };

  const fetchDrivers = async () => {
    const res = await fetch('http://localhost:5000/api/drivers');
    const data = await res.json();
    setDrivers(data);
  };

  const assignDriver = async (bookingId: number, driverId: number) => {
    const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/driver`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driver_id: driverId }),
    });

    if (res.ok) {
      fetchBookings(); // Refresh table
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">📋 Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-100 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Guest</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Pickup</th>
              <th className="px-4 py-2 text-left">Drop</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Driver</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t text-sm hover:bg-gray-50">
                <td className="px-4 py-2">{b.guestname}</td>
                <td className="px-4 py-2">{b.guestcontact}</td>
                <td className="px-4 py-2">{b.pickup_location}</td>
                <td className="px-4 py-2">{b.drop_location}</td>
                <td className="px-4 py-2">{b.vehicle_type}</td>
                <td className="px-4 py-2">
                  <select
                    value={b.driver_id ?? ''}
                    onChange={(e) => assignDriver(b.id, Number(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">-- Assign --</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
