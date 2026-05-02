import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import userAPI from "../api/userAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userAPI
      .get("/package/getall")
      .then((res) => {
        setPackages(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBookPackage = (packageId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to continue booking");
      navigate("/login");
    } else {
      navigate(`/booking/package/${packageId}`);
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-5 bg-light">
      <Container>
        {/* Search */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h2 className="fw-bold">Find Your Packages</h2>
          </Col>

          <Col xs={12} md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Search Your Packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="primary">Search</Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="g-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <Card
                    className="h-100 border-0 shadow-sm rounded-4 p-3"
                    style={{ minHeight: "420px" }} // 👈 height bada
                  >
                    {/* Image */}
                    <div
                      className="skeleton-img mb-3"
                      style={{ height: "240px" }}
                    ></div>

                    {/* Rating */}
                    <div
                      className="skeleton-text mb-2"
                      style={{ width: "40%" }}
                    ></div>

                    {/* Title */}
                    <div
                      className="skeleton-text mb-2"
                      style={{ width: "70%" }}
                    ></div>

                    {/* Points */}
                    <div className="skeleton-text mb-2"></div>
                    <div className="skeleton-text mb-2"></div>

                    {/* Duration */}
                    <div
                      className="skeleton-text mb-2"
                      style={{ width: "50%" }}
                    ></div>

                    {/* Destinations */}
                    <div
                      className="skeleton-text mb-3"
                      style={{ width: "80%" }}
                    ></div>

                    {/* Footer */}
                    <div className="d-flex justify-content-between">
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
            : (
              <>
                {filteredPackages.length === 0 && (
                  <p className="text-center text-muted">
                    No packages found
                  </p>
                )}

                {filteredPackages.map((pkg) => (
                  <Col key={pkg._id} lg={4} md={6} sm={12}>
                    <Card
                      className="h-100 border-0 shadow-sm rounded-4"
                      style={{ minHeight: "420px" }} // 👈 height same
                    >
                      <div className="position-relative p-3">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="img-fluid rounded-4"
                          style={{
                            height: "240px", // 👈 image height bhi bada
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />

                        {pkg.badge && (
                          <Badge
                            bg="danger"
                            className="position-absolute top-0 end-0 m-4"
                          >
                            {pkg.badge}
                          </Badge>
                        )}
                      </div>

                      <Card.Body>
                        <div className="d-flex align-items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color="#28a745" size={14} />
                          ))}
                          <small className="text-muted ms-2">
                            {pkg.reviews || 0} reviews
                          </small>
                        </div>

                        <h5 className="fw-bold">{pkg.title}</h5>

                        <div className="text-muted small mb-2">
                          ✔ No Booking Fee &nbsp; ✔ Best Price Ever
                        </div>

                        <div className="text-muted small mb-2">
                          🕒 Duration: {pkg.duration}
                        </div>

                        <p className="small text-muted">
                          <strong>Destinations:</strong> {pkg.destinations}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <Button
                            variant="primary"
                            className="rounded-pill px-4"
                            onClick={() => handleBookPackage(pkg._id)}
                          >
                            Book Now
                          </Button>

                          <div className="text-end">
                            {pkg.oldPrice && (
                              <small className="text-muted d-block">
                                <del>${pkg.oldPrice}</del>
                              </small>
                            )}
                            <span className="fs-4 fw-bold">
                              ${pkg.price}
                            </span>
                            <small className="text-muted d-block">
                              Per Person
                            </small>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            )}
        </Row>
      </Container>
    </div>
  );
};

export default Packages;