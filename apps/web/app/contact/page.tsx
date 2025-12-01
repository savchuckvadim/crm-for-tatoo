'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would send to API in real implementation
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
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
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}

