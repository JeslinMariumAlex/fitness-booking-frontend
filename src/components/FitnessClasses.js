import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FitnessClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/classes/')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const handleBookClick = (classId) => {
    setSelectedClassId(classId);
    setMessage('');
  };

  const handleBooking = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/book/', {
      class_id: selectedClassId,
      client_name: clientName,
      client_email: clientEmail,
    })
    .then(response => {
      setMessage('✅ Booking successful!');
      setClientName('');
      setClientEmail('');
      setSelectedClassId(null);
    })
    .catch(error => {
      setMessage('❌ Booking failed. Please try again.');
      console.error('Booking error:', error);
    });
  };

  return (
    <div>
      <h2>Upcoming Fitness Classes</h2>
      <ul>
        {classes.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> by {item.instructor} on {new Date(item.datetime).toLocaleString()} <br />
            Slots Available: {item.available_slots}
            <br />
            <button onClick={() => handleBookClick(item.id)}>Book</button>
          </li>
        ))}
      </ul>

      {selectedClassId && (
        <div style={{ marginTop: '20px' }}>
          <h3>Book Class</h3>
          <form onSubmit={handleBooking}>
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
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default FitnessClasses;
