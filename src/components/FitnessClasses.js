import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FitnessClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/classes/')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  return (
    <div>
      <h2>Upcoming Fitness Classes</h2>
      <ul>
        {classes.map((item) => (
          <li key={item.id}>
            {item.name} by {item.instructor} on {new Date(item.datetime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessClasses;
