import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = ({ classId }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/book/', {
      class_id: classId,
      client_name: clientName,
      client_email: clientEmail,
    })
    .then(() => {
      setMessage('✅ Booking successful!');
      setClientName('');
      setClientEmail('');
    })
    .catch((error) => {
      const msg = error.response?.data?.error || '❌ Booking failed. Try again.';
      setMessage(msg);
    });
  };

  return (
    <form className="booking-form" onSubmit={handleBooking}>
      <input
        type="text"
        placeholder="Your Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
        required
      />
      <button type="submit">Book</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default BookingForm;
