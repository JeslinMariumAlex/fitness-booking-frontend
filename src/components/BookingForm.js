import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const BookingForm = ({ classId }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(''); // for alert type

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/book/', {
      class_id: classId,
      client_name: clientName,
      client_email: clientEmail,
    })
      .then(() => {
        setMessage('✅ Booking successful!');
        setVariant('success');
        setClientName('');
        setClientEmail('');
      })
      .catch(error => {
        const errorMsg = error.response?.data?.error || '❌ Booking failed. Please try again.';
        setMessage(`❌ ${errorMsg}`);
        console.error('Booking error:', error);
      });

  };

  return (
    <div className="mt-3">
      {message && <Alert variant={variant}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-2">
          <Form.Control
            type="text"
            placeholder="Your Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-2">
          <Form.Control
            type="email"
            placeholder="Your Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" size="sm">
          Confirm Booking
        </Button>
      </Form>
    </div>
  );
};

export default BookingForm;
