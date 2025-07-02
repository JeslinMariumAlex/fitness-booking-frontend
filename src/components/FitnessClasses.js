import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import { Card, Button, Row, Col, Spinner, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const FitnessClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [loading, setLoading] = useState(true);

  const classImages = {
    Yoga: 'https://www.healthhosts.com/wp-content/uploads/bb-plugin/cache/Yoga-Website-Design-1024x683-square.jpeg',
    Zumba: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg',
    HIIT: 'https://truselfsportingclub.com/wp-content/uploads/2022/07/TruSelf-Sporting-Club-HIIT-class-image-san-diego-gym-scaled.jpeg',
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/classes/')
      .then(response => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setLoading(false);
      });
  }, []);

  const handleBookClick = (classId) => {
    setSelectedClassId(classId);
  };

  return (
    <Container>
      <h2 className="text-center my-4 fw-bold display-6">Book Your Classes</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} sm={1} md={2} lg={3} className="g-4 mb-5">
          {classes.map(item => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm card-hover">
                <Card.Img
                  variant="top"
                  src={classImages[item.name] || 'https://via.placeholder.com/400x200?text=Fitness+Class'}
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-semibold fs-4">{item.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Instructor: <strong>{item.instructor}</strong>
                    </Card.Subtitle>
                    <div className="mb-2">
                      <i className="bi bi-calendar3 pe-2 text-secondary"></i>
                      <strong>Date:</strong>{' '}
                      {new Date(item.datetime).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}

                    </div>
                    <div className="mb-3">
                      <i className="bi bi-person-check pe-2 text-secondary"></i>
                      <strong>Slots:</strong> {item.available_slots}
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="success"
                      className="w-100 book-btn"
                      onClick={() => handleBookClick(item.id)}
                    >
                      Book Now
                    </Button>
                    {selectedClassId === item.id && (
                      <div className="mt-3">
                        <BookingForm classId={item.id} />
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FitnessClasses;
