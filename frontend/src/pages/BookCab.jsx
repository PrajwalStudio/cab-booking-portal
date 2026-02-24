import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PlacesAutocompleteInput from "../components/PlacesAutocompleteInput";

const API_URL = process.env.REACT_APP_API_URL;

const BookCab = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    vehicleType: "sedan",
    isOpenMarket: true,
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const pickupTime = new Date(`${form.pickupDate}T${form.pickupTime}`);

    try {
      await axios.post(
        `${API_URL}/api/bookings`,
        { ...form, pickupTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Cab booked successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (!user || user.role !== "company") {
    return <div className="text-center mt-10 text-red-600">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Book a Cab
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name *
            </label>
            <input
              name="guestName"
              placeholder="Guest Name"
              value={form.guestName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Phone *
            </label>
            <input
              name="guestPhone"
              placeholder="Guest Phone"
              value={form.guestPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Email
            </label>
            <input
              name="guestEmail"
              type="email"
              placeholder="Guest Email"
              value={form.guestEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location *
            </label>
            <PlacesAutocompleteInput
              value={form.pickupLocation}
              onChange={(val) => setForm({ ...form, pickupLocation: val })}
              placeholder="Pickup Location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Drop Location *
            </label>
            <PlacesAutocompleteInput
              value={form.dropLocation}
              onChange={(val) => setForm({ ...form, dropLocation: val })}
              placeholder="Drop Location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date *
              </label>
              <input
                name="pickupDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.pickupDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time *
              </label>
              <input
                name="pickupTime"
                type="time"
                min={
                  form.pickupDate === new Date().toISOString().split("T")[0]
                    ? new Date().toTimeString().substring(0, 5)
                    : "00:00"
                }
                value={form.pickupTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type *
            </label>
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Any special instructions..."
              value={form.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookCab;
