import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  InputGroup,
  Form,
} from "react-bootstrap";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import userAPI from "../api/userAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hotelBanner from "../image/hotel-top.jpg";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userAPI
      .get("/hotel/getall")
      .then((res) => {
        setHotels(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBookHotel = (hotelId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to continue booking");
      navigate("/login");
    } else {
      navigate(`/booking/hotel/${hotelId}`);
    }
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-5 bg-light">
      

      <div
      className="banner"
        style={{
          background: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${hotelBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "40vh",
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container fluid className="text-center text-white">
          <h1 className="fw-bold display-5">Luxury Hotels</h1>
          <p className="opacity-75">Handpicked premium stays worldwide</p>
        </Container>
      </div>
      {/* Search */}
      <Container className="py-4">
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h2 className="fw-bold">Find Your Hotels</h2>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Search hotels..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="primary">Search</Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      {/* Hotel Cards */}
      <Container>
        <Row className="g-4">
          
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 p-3">
                    
                    {/* Image Skeleton */}
                    <div
                      className="skeleton-img mb-3"
                      style={{ height: "220px" }}
                    ></div>

                    {/* Rating */}
                    <div className="skeleton-text mb-2" style={{ width: "40%" }}></div>

                    {/* Title */}
                    <div className="skeleton-text mb-2" style={{ width: "60%" }}></div>

                    {/* Location */}
                    <div className="skeleton-text mb-3" style={{ width: "50%" }}></div>

                    {/* Amenities */}
                    <div className="d-flex gap-2 mb-3">
                      <div className="skeleton-text" style={{ width: "30%" }}></div>
                      <div className="skeleton-text" style={{ width: "20%" }}></div>
                      <div className="skeleton-text" style={{ width: "25%" }}></div>
                    </div>

                    {/* Footer */}
                    <div className="d-flex justify-content-between">
                      <div className="skeleton-text" style={{ width: "30%" }}></div>
                      <div className="skeleton-text" style={{ width: "25%" }}></div>
                    </div>

                  </Card>
                </Col>
              ))
            : (
              <>
                {filteredHotels.length === 0 && (
                  <p className="text-center text-muted">No hotels found</p>
                )}

                {filteredHotels.map((hotel) => (
                  <Col key={hotel._id} lg={4} md={6} sm={12}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 hotel-card">
                      
                      <div className="position-relative p-3">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="img-fluid rounded-4 hotel-img"
                          style={{
                            height: "220px",
                            width: "100%",
                            objectFit: "cover",
                            transition: "transform .4s",
                          }}
                        />

                        {hotel.badge && (
                          <Badge
                            bg="danger"
                            className="position-absolute top-0 end-0 m-4"
                          >
                            {hotel.badge}
                          </Badge>
                        )}
                      </div>

                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2 text-warning">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={14} />
                          ))}
                          <small className="text-muted ms-2">
                            {hotel.reviewsCount || 0} reviews
                          </small>
                        </div>

                        <h5 className="fw-bold">{hotel.name}</h5>

                        <p className="text-muted small mb-2">
                          <FaMapMarkerAlt className="me-1" />
                          {hotel.city}, {hotel.country}
                        </p>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {(hotel.amenities || []).map((item, i) => (
                            <Badge bg="light" text="dark" key={i}>
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </Card.Body>

                      <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center">
                        <Button
                          variant="primary"
                          className="rounded-pill px-4"
                          onClick={() => handleBookHotel(hotel._id)}
                        >
                          Book Now
                        </Button>

                        <div className="text-end">
                          <small className="text-muted">Per Night</small>
                          <h4 className="fw-bold">
                            ${hotel.pricePerNight || hotel.price || 0}
                          </h4>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </>
            )}
        </Row>
      </Container>

      {/* Hover CSS */}
      <style>{`
        .hotel-card:hover {
          transform: translateY(-8px);
          transition: .3s;
        }
        .hotel-card:hover .hotel-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Hotels;