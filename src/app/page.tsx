'use client';

import { useState } from 'react';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';
import { Phone, MapPin, User, Car, Clock, Briefcase, ChevronRight } from 'lucide-react';

export default function BookPage() {
  const [form, setForm] = useState({
    guestName: '',
    guestContact: '',
    pickupTime: '',
    dropTime: '',
    vehicleType: 'Sedan',
    companyName: '',
    pickupLocation: '',
    dropLocation: '',
  });

  // Google Autocomplete binding
  usePlacesAutocomplete('pickup', (address) =>
    setForm((prev) => ({ ...prev, pickupLocation: address }))
  );
  usePlacesAutocomplete('drop', (address) =>
    setForm((prev) => ({ ...prev, dropLocation: address }))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert('Booking submitted successfully!');
        setForm({
          guestName: '',
          guestContact: '',
          pickupTime: '',
          dropTime: '',
          vehicleType: 'Sedan',
          companyName: '',
          pickupLocation: '',
          dropLocation: '',
        });
      } else {
        alert('Booking failed.');
      }
    } catch (err) {
      alert('Error submitting form');
      console.error(err);
    }
  };

  const vehicleTypes = [
    { id: 'sedan', name: 'Sedan', icon: <Car className="w-6 h-6" />, price: '₹10/km' },
    { id: 'suv', name: 'SUV', icon: <Car className="w-6 h-6" />, price: '₹15/km' },
    { id: 'hatchback', name: 'Hatchback', icon: <Car className="w-6 h-6" />, price: '₹8/km' },
    { id: 'luxury', name: 'Luxury', icon: <Car className="w-6 h-6" />, price: '₹25/km' },
  ];

  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Visual panel */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Book Your Ride</h1>
            <p className="text-blue-200">Fast, safe, and reliable transportation</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Car className="w-12 h-12 text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Instant Booking</h2>
              <p className="text-blue-200 text-sm">Available 24/7 across the city</p>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-blue-600">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-blue-300">Need help?</p>
                <p className="font-bold text-sm">1800 889 889</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full md:w-2/3 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Trip Details</h2>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    id="pickup"
                    name="pickupLocation"
                    value={form.pickupLocation}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                    className="border-b-2 p-2 pl-8 w-full focus:outline-none focus:border-blue-500"
                  />
                  <MapPin className="absolute left-2 top-3 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    id="drop"
                    name="dropLocation"
                    value={form.dropLocation}
                    onChange={handleChange}
                    placeholder="Enter drop location"
                    required
                    className="border-b-2 p-2 pl-8 w-full focus:outline-none focus:border-blue-500"
                  />
                  <MapPin className="absolute left-2 top-3 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <input
                    type="datetime-local"
                    name="pickupTime"
                    value={form.pickupTime}
                    onChange={handleChange}
                    min={today}
                    required
                    className="border p-2 pl-8 rounded w-full"
                  />
                  <Clock className="absolute left-2 bottom-2 text-gray-400" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drop Time</label>
                  <input
                    type="datetime-local"
                    name="dropTime"
                    value={form.dropTime}
                    onChange={handleChange}
                    min={today}
                    required
                    className="border p-2 pl-8 rounded w-full"
                  />
                  <Clock className="absolute left-2 bottom-2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Choose Vehicle</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {vehicleTypes.map((vehicle) => (
                  <label
                    key={vehicle.id}
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      form.vehicleType === vehicle.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="vehicleType"
                      value={vehicle.name}
                      checked={form.vehicleType === vehicle.name}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-blue-600 mb-1">{vehicle.icon}</span>
                      <span className="font-medium">{vehicle.name}</span>
                      <span className="text-xs text-gray-500">{vehicle.price}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Passenger Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Passenger Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    name="guestName"
                    value={form.guestName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="border p-2 pl-8 rounded w-full"
                  />
                  <User className="absolute left-2 top-2.5 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    name="guestContact"
                    value={form.guestContact}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="border p-2 pl-8 rounded w-full"
                  />
                  <Phone className="absolute left-2 top-2.5 text-gray-400" />
                </div>
              </div>
              <div className="relative mt-4">
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Company Name (Optional)"
                  className="border p-2 pl-8 rounded w-full"
                />
                <Briefcase className="absolute left-2 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center"
            >
              CONFIRM & BOOK RIDE
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}