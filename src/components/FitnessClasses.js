import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import './FitnessClasses.css';

const FitnessClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/classes/')
      .then((response) => setClasses(response.data))
      .catch((error) => console.error('Error fetching classes:', error));
  }, []);

  return (
    <div className="fitness-container">
      <h2 className="title">🏋️‍♂️ Upcoming Fitness Classes</h2>
      <ul className="class-list">
        {classes.map((item) => (
          <li key={item.id} className="class-item">
            <div className="class-info">
              <h3>{item.name}</h3>
              <p><strong>Instructor:</strong> {item.instructor}</p>
              <p><strong>Date & Time:</strong> {new Date(item.datetime).toLocaleString()}</p>
              <p><strong>Slots Available:</strong> {item.available_slots}</p>
            </div>
            <BookingForm classId={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessClasses;
