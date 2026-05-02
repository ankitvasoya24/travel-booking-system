import { useEffect, useState } from "react";
import userAPI from "../api/userAPI";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaStar,
} from "react-icons/fa";

const cardStyle = {
  borderRadius: "22px",
  boxShadow: "0 18px 45px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
};

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    userAPI
      .get("/flight/getall")
      .then((res) => {
        setFlights(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBookFlight = (flightId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to continue booking");
      navigate("/login");
    } else {
      navigate(`/booking/flight/${flightId}`);
    }
  };

  return (
    <Container className="py-5">
      
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Available Flights</h2>
        <p className="text-muted">
          Best fares • Verified airlines • Instant booking
        </p>
      </div>

      <Row className="g-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Col xs={12} md={6} lg={4} key={index}>
                <Card className="border-0 h-100 p-3" style={cardStyle}>
                  
                  {/* Airline */}
                  <div className="skeleton-text mb-2" style={{ width: "60%" }}></div>

                  {/* Rating */}
                  <div className="skeleton-text mb-3" style={{ width: "40%" }}></div>

                  {/* Route */}
                  <div className="d-flex justify-content-between my-5">
                    <div className="skeleton-text" style={{ width: "30%" }}></div>
                    <div className="skeleton-text" style={{ width: "20%" }}></div>
                    <div className="skeleton-text" style={{ width: "30%" }}></div>
                  </div>

                  <hr />

                  {/* Price + Seats */}
                  <div className="d-flex justify-content-between">
                    <div className="skeleton-text" style={{ width: "30%" }}></div>
                    <div className="skeleton-text" style={{ width: "25%" }}></div>
                  </div>

                  {/* Button */}
                  <div
                    className="skeleton-text mt-4"
                    style={{ height: "50px", borderRadius: "20px" }}
                  ></div>

                </Card>
              </Col>
            ))
          : flights.map((f) => (
              <Col xs={12} md={6} lg={4} key={f._id}>
                <Card
                  className="border-0 h-100"
                  style={cardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-8px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold mb-0">{f.airline}</h5>
                      <Badge bg="dark">{f.flightNumber}</Badge>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-3">
                      <FaStar className="text-warning" />
                      <span className="fw-semibold">{f.rating}</span>
                      <small className="text-muted">
                        ({f.reviewsCount} reviews)
                      </small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center text-center my-4">
                      <div>
                        <FaPlaneDeparture className="text-primary fs-5 mb-1" />
                        <div className="fw-bold">{f.fromCity}</div>
                        <small className="text-muted">
                          {f.fromCode} • {f.departureTime}
                        </small>
                      </div>

                      <div>
                        <small className="text-muted d-block">{f.duration}</small>
                        <div
                          style={{
                            width: "70px",
                            height: "2px",
                            background: "#0d6efd",
                            margin: "6px auto",
                          }}
                        />
                      </div>

                      <div>
                        <FaPlaneArrival className="text-success fs-5 mb-1" />
                        <div className="fw-bold">{f.toCity}</div>
                        <small className="text-muted">
                          {f.toCode} • {f.arrivalTime}
                        </small>
                      </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <div>
                        <small className="text-muted">Starting From</small>
                        <h4 className="fw-bold text-primary mb-0">
                          $ {f.price}
                        </h4>
                      </div>

                      <div className="text-end">
                        <Badge bg="info" className="mb-1">
                          {f.seatType}
                        </Badge>
                        <div className="small">
                          <span className="fw-semibold">
                            {f.availableSeats} seats left
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-100 rounded-pill mt-4 fw-semibold"
                      onClick={() => handleBookFlight(f._id)}
                    >
                      Book Flight
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default Flights;