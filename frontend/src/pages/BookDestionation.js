import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUsers,
  FaRegStickyNote,
  FaStar,
  FaBed,
  FaUtensils,
  FaRoute,
  FaBus,
  FaCheckCircle,
} from "react-icons/fa";
import userAPI from "../api/userAPI";
import { useNavigate } from "react-router-dom";

const DestinationBook = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    persons: 1,
    date: "",
    specialRequest: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await userAPI.get(
          `/destination/book/${id}`,
        );
        setTour(response.data.data || response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load tour data!");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first to continue booking");
    navigate("/login");
    return; 
  }
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        destinationId: id,
      };

      const res = await userAPI.post(
        "/booking/create",
        payload,
      );

      if (res.data.success) {
       navigate("/booking-success");
      }

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        persons: 1,
        date: "",
        specialRequest: "",
      });
    } catch (error) {
      alert("Booking Failed!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  if (!tour) return <p className="text-center my-5">Destination not found!</p>;

  // Styles
  const styles = {
    card: {
      borderRadius: "15px",
      padding: "2rem",
      background: "#fff",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    formCard: {
      borderRadius: "15px",
      padding: "2rem",
      background: "#f9f9f9",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    submitBtn: {
      background: "blue",
      border: "none",
      fontWeight: "bold",
      letterSpacing: "0.5px",
    },
    infoItem: {
      marginBottom: "0.8rem",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      color: "#444",
      fontSize: "0.95rem",
    },
    list: { paddingLeft: "1.2rem", listStyleType: "disc", color: "#555" },
    heading: { marginBottom: "0.8rem", color: "#333" },
    commentLine: {
      fontStyle: "italic",
      color: "#ff7f50",
      margin: "0.5rem 0 1rem 0",
    },
  };

  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* Tour Content */}
        <Col md={6}>
          <Card style={styles.card}>
            <h2 className="fw-bold mt-1">{tour.title}</h2>
            <div style={styles.infoItem}>
              <FaUtensils /> Meals: {tour.meals}
            </div>
            <div style={styles.infoItem}>
              <FaBed /> Hotel: {tour.hotelType}
            </div>
            <div style={styles.infoItem}>
              <FaRoute /> Route: {tour.route}
            </div>
            <div style={styles.infoItem}>
              <FaBus /> Transport: {tour.transport}
            </div>
            <div style={styles.infoItem}>
              <FaCheckCircle /> Duration: {tour.duration}
            </div>
            <div style={styles.infoItem}>
              <FaUsers /> Price: ${tour.price} / person
            </div>
            <p>
              <FaStar /> Reviews: {tour.reviews || 0}{" "}
            </p>

            <p style={styles.commentLine}>
              {" "}
              Experience the adventure of a lifetime!
            </p>

            <h5 style={styles.heading}>Activities:</h5>
            <ul style={styles.list}>
              {tour.activities.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>

            <h5 style={styles.heading}>Highlights:</h5>
            <ul style={styles.list}>
              {tour.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </Card>
        </Col>

        {/* Booking Form */}
        <Col md={6}>
          <Card style={styles.formCard}>
            <h4 className="mb-4 fw-bold text-center">Book Your Destination</h4>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaPhone />
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 9875663684"
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of Persons</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUsers />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                    min={1}
                    max={20}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Select Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Special Requests</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaRegStickyNote />
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    name="specialRequest"
                    rows={3}
                    value={formData.specialRequest}
                    onChange={handleChange}
                    placeholder="Any special requests?"
                  />
                </InputGroup>
              </Form.Group>

              <Button
                type="submit"
                style={styles.submitBtn}
                className="w-100 mt-2"
                disabled={submitting}
              >
                {submitting ? "Booking..." : "Submit Booking"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DestinationBook;
