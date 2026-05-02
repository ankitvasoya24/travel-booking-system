import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  InputGroup,
  Button,
  Form,
} from "react-bootstrap";
import userAPI from "../api/userAPI";
import { Link } from "react-router-dom";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await userAPI.get(
          "/destination/getall?all=true",
        );
        setDestinations(res.data.destinations || res.data.data || []);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((dest) =>
    dest.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="py-5 bg-light">
      <Container>
        {/* Header + Search */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h2 className="fw-bold">Find Your Next Destination</h2>
            <p className="text-muted">
              Explore the world's most beautiful places
            </p>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup className="shadow-sm rounded">
              <Form.Control
                placeholder="Search cities or countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0"
              />
              <Button variant="primary" className="px-4">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="g-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Col xs={12} sm={6} lg={4} key={index}>
                <Card className="h-100 border-0 shadow-sm p-3">
                  {/* Image Skeleton */}
                  <div className="skeleton-img mb-3"></div>

                  {/* Title */}
                  <div
                    className="skeleton-text mb-2"
                    style={{ width: "60%" }}
                  ></div>

                  {/* Subtitle */}
                  <div
                    className="skeleton-text mb-2"
                    style={{ width: "40%" }}
                  ></div>

                  {/* Description lines */}
                  <div className="skeleton-text mb-2"></div>
                  <div className="skeleton-text mb-2"></div>

                  {/* Bottom section */}
                  <div className="d-flex justify-content-between mt-3">
                    <div
                      className="skeleton-text"
                      style={{ width: "30%" }}
                    ></div>
                    <div
                      className="skeleton-text"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <>
              {filteredDestinations.length === 0 && (
                <p className="text-center text-muted">No destinations found</p>
              )}

              {filteredDestinations.map((dest) => (
                <Col xs={12} sm={6} lg={4} key={dest._id}>
                  <Card className="h-100 border-0 shadow-sm overflow-hidden hover-shadow transition">
                    <div className="position-relative overflow-hidden">
                      <Card.Img
                        src={dest.image}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                        className="card-img-hover"
                      />

                      <Badge
                        bg="white"
                        text="dark"
                        className="position-absolute top-0 start-0 m-3 shadow-sm"
                      >
                        ⭐ {dest.reviews || 0}
                      </Badge>

                      {dest.badge && (
                        <Badge
                          bg="warning"
                          text="dark"
                          className="position-absolute top-0 end-0 m-3 shadow-sm"
                        >
                          {dest.badge}
                        </Badge>
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Subtitle className="text-uppercase text-primary small fw-bold mb-2">
                          {dest.category}
                        </Card.Subtitle>

                        <Card.Title className="fw-bold mb-2">
                          {dest.title}
                        </Card.Title>

                        {dest.duration && (
                          <p className="text-muted small mb-2">
                            Duration: <strong>{dest.duration}</strong>
                          </p>
                        )}

                        <Card.Text className="text-muted small">
                          {dest.description ||
                            `Discover the hidden gems in ${dest.title}.`}
                        </Card.Text>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-dark fw-medium">
                          From{" "}
                          <strong className="fs-5 text-primary">
                            ${dest.price || 0}
                          </strong>
                        </span>

                        <Link
                          to={`/destination/book/${dest._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Book Now
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>

      <style>
        {`
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
          }

          .transition {
            transition: all 0.3s ease;
          }
        `}
      </style>
    </div>
  );
};

export default Destinations;
