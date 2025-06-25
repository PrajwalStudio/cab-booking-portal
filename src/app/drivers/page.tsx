'use client';
import { useState, useEffect } from 'react';

type Driver = {
  id: number;
  name: string;
  phone: string;
};

export default function DriverPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [form, setForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const res = await fetch('http://localhost:5000/api/drivers');
    const data = await res.json();
    setDrivers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/drivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ name: '', phone: '' });
      fetchDrivers();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">👨‍✈️ Add Driver</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Driver name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Driver
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">📋 Driver List</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.id} className="border-t">
              <td className="p-2">{d.name}</td>
              <td className="p-2">{d.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
