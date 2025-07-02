import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';

const ViewBookings = () => {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const handleFetchBookings = () => {
    axios
      .get(`http://127.0.0.1:8000/api/bookings/?email=${email}`)
      .then((response) => {
        setBookings(response.data);
        setError('');
      })
      .catch(() => {
        setError('❌ No bookings found or invalid email.');
        setBookings([]);
      });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 fw-bold">Your Bookings</h1>

      <Form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <Row className="align-items-end justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Enter your email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs="auto" className="mt-3 mt-sm-0">
            <Button variant="success" onClick={handleFetchBookings}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        {bookings.map((booking) => (
          <Col xs={12} sm={10} md={6} lg={4} key={booking.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="fw-semibold">
                  {booking.fitness_class.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Instructor: {booking.fitness_class.instructor}
                </Card.Subtitle>
                <Card.Text>
                  <i className="bi bi-calendar3 pe-2"></i>
                  <strong>Date:</strong>{' '}
                  {new Date(booking.fitness_class.datetime).toLocaleString('en-US', {
                    weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                  })}
                  <br />
                  <i className="bi bi-person pe-2"></i>
                  <strong>Booked By:</strong> {booking.client_name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewBookings;
