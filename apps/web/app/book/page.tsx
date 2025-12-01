'use client';

import { useState } from 'react';

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would send to API in real implementation
    console.log('Booking submitted:', formData);
    alert('Appointment requested! We will confirm shortly.');
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Book an Appointment</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 font-semibold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="service" className="block mb-2 font-semibold">
            Service
          </label>
          <select
            id="service"
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a service</option>
            <option value="tattoo">Tattoo</option>
            <option value="consultation">Consultation</option>
            <option value="touch-up">Touch-up</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block mb-2 font-semibold">
            Preferred Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-2 font-semibold">
            Preferred Time
          </label>
          <input
            type="time"
            id="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block mb-2 font-semibold">
            Additional Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Request Appointment
        </button>
      </form>
    </main>
  );
}

