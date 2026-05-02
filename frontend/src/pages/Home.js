import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Badge,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import userAPI from "../api/userAPI";

import {
  FaUserFriends,
  FaSuitcaseRolling,
  FaSmile,
  FaRedoAlt,
} from "react-icons/fa";

import img1 from "../image/slider/image1.png";
import img2 from "../image/slider/image2.png";
import img3 from "../image/slider/image3.png";
import img4 from "../image/slider/image4.png";
import img5 from "../image/slider/image5.png";
import img6 from "../image/slider/image6.png";

import img7 from "../image/trip1.jpg";
import img8 from "../image/trip2.jpg";
import img9 from "../image/trip3.jpg";

const logos = [img1, img2, img3, img4, img5, img6];

const onedaytripData = [
  {
    id: 1,
    title: "Hanoi Kiem Lake",
    location: "Hanoi, Vietnam",
    price: 99,
    image: img7,
    tag: "Hot Sale!",
  },
  {
    id: 2,
    title: "Newlands Safari Forest",
    location: "South Africa",
    price: 89,
    image: img8,
  },
  {
    id: 3,
    title: "Ho Chi Minh City (Saigon)",
    location: "Saigon, Vietnam",
    price: 69,
    image: img9,
    tag: "Hot Sale!",
  },
];

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1 Person");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    userAPI
      .get("/package/getall")
      .then((res) => {
        setPackages(res.data.data.slice(0, 4));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  //  Search function
  const handleSearch = () => {
    if (!destination) {
      alert("Please enter destination");
      return;
    }

    navigate(
      `/packages?destination=${destination}&date=${date}&travelers=${travelers}`,
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              {/* Title */}
              <h1 className="hero-title fw-bold mb-3">
                Explore the World with Gotur
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle mb-4">
                Your next adventure starts here. Discover breathtaking
                destinations and exclusive travel packages.
              </p>

              {/* Form Card */}
              <Card className="hero-card p-3 p-md-4 bg-white text-dark shadow-lg border-0">
                <Form>
                  <Row className="g-3 align-items-end">
                    <Col xs={12} sm={6} md={4}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Destination</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Where to go?"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Travelers</Form.Label>
                        <Form.Select
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                        >
                          <option>1 Person</option>
                          <option>2 Persons</option>
                          <option>3 Persons</option>
                          <option>4 Persons</option>
                          <option>5 Persons</option>
                          <option>Family (4+)</option>
                          <option>Friends Group</option>
                          <option>Couple</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={6} md={2}>
                      <Button
                        variant="primary"
                        className="w-100 py-2"
                        onClick={handleSearch}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* slider */}
      <section className="trusted-section">
        <Container>
          <h3 className="text-center mb-5">
            Those Company You Can Easily Trust!
          </h3>
        </Container>

        <div className="logo-slider mb-4">
          <div className="logo-track">
            {[...logos, ...logos].map((logo, index) => (
              <img key={index} src={logo} alt="company logo" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Popular Package</h2>
            <p className="text-muted">
              Handpicked locations for your dream vacation
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Col
                    key={index}
                    xs={10}
                    sm={6}
                    md={4}
                    lg={3}
                    className="d-flex justify-content-center"
                  >
                    {/* Skeleton Card */}
                    <div className="package-card h-100 w-100 p-3">
                      <div className="skeleton-img mb-3"></div>

                      <div className="skeleton-text mb-2"></div>
                      <div className="skeleton-text small mb-3"></div>

                      <div className="d-flex justify-content-between">
                        <div className="skeleton-text w-50"></div>
                        <div className="skeleton-text w-25"></div>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between">
                        <div className="skeleton-text w-40"></div>
                        <div className="skeleton-text w-40"></div>
                      </div>
                    </div>
                  </Col>
                ))
              : packages.map((item) => (
                  <Col
                    key={item._id}
                    xs={10}
                    sm={6}
                    md={4}
                    lg={3}
                    className="d-flex justify-content-center"
                  >
                    <div className="package-card h-100 w-100">
                      <div className="package-img">
                        {item.tag && (
                          <span className="badge-sale">{item.tag}</span>
                        )}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid"
                        />
                      </div>

                      <div className="package-body">
                        <h5 className="fw-bold">{item.title}</h5>

                        <div className="text-muted small mb-3">
                          <i className="bi bi-geo-alt"></i> {item.location}{" "}
                          &nbsp; ⇄ &nbsp; {item.duration} Days
                        </div>

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                          <Link to="/packages" className="btn btn-book">
                            Book Now <i className="bi bi-arrow-up-right"></i>
                          </Link>

                          <div className="text-end">
                            <div className="small text-muted">Per Person</div>
                            <div className="price">${item.price}</div>
                          </div>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between small text-muted flex-wrap gap-2">
                          <span>
                            <i className="bi bi-balloon"></i> Experience
                          </span>
                          <span role="button">
                            <i className="bi bi-plus-circle"></i> Customize
                            Package
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
          </Row>

          {/* One day package */}
          <Row>
            <section className="py-5">
              <Container>
                <div className="text-center mb-5">
                  <h2 className="fw-bold">One Day Trips</h2>
                  <p className="text-muted">
                    A curated list of the most popular travel packages based on
                    different destinations.
                  </p>
                </div>

                {/* Cards */}
                <Row className="g-4 justify-content-center">
                  {onedaytripData.map((trip, index) => (
                    <Col
                      key={trip.id}
                      lg={4}
                      md={6}
                      sm={12}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                      data-aos-duration="1200"
                    >
                      <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        {/* Image */}
                        <div className="position-relative">
                          <Card.Img src={trip.image} className="trip-img" />
                          {trip.tag && (
                            <Badge
                              bg="danger"
                              className="position-absolute top-0 end-0 m-3 px-3 py-2"
                            >
                              {trip.tag}
                            </Badge>
                          )}
                        </div>

                        {/* Body */}
                        <Card.Body>
                          <h5 className="fw-bold">{trip.title}</h5>
                          <p className="text-muted mb-3">
                            <i className="bi bi-geo-alt me-1"></i>
                            {trip.location}
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <Button className="px-4 rounded-pill">
                              Book Now
                            </Button>
                            <div className="text-end">
                              <small className="text-muted">Per Person</small>
                              <h5 className="fw-bold mb-0">${trip.price}</h5>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </section>
          </Row>
        </Container>

        {/* background banner section*/}
        <div className="hero-bg">
          <div className="hero-content">
            <h1 className="hero-title">Best Tour & Travel Operator</h1>

            <p className="hero-text">
              Plan your perfect journey with us — from breathtaking destinations
              to affordable travel packages, we make every trip memorable.
            </p>
          </div>
        </div>

        <section className="stats-section py-5 mt-5 bg-white">
          <Container>
            <Row className="text-center g-1">
              {/* Stat 1 */}
              <Col xs={6} sm={6} md={3}>
                <div className="stat-box">
                  <FaSuitcaseRolling className="stat-icon text-warning" />
                  <h3 className="fw-bold mb-1">13K+</h3>
                  <p className="text-muted mb-0">Tour Completed</p>
                </div>
              </Col>

              {/* Stat 2 */}
              <Col xs={6} sm={6} md={3}>
                <div className="stat-box">
                  <FaUserFriends className="stat-icon text-danger" />
                  <h3 className="fw-bold mb-1">10+</h3>
                  <p className="text-muted mb-0">Travel Experience</p>
                </div>
              </Col>

              {/* Stat 3 */}
              <Col xs={6} sm={6} md={3}>
                <div className="stat-box">
                  <FaSmile className="stat-icon text-primary" />
                  <h3 className="fw-bold mb-1">21K+</h3>
                  <p className="text-muted mb-0">Happy Traveler</p>
                </div>
              </Col>

              {/* Stat 4 */}
              <Col xs={6} sm={6} md={3}>
                <div className="stat-box">
                  <FaRedoAlt className="stat-icon text-success" />
                  <h3 className="fw-bold mb-1">88%</h3>
                  <p className="text-muted mb-0">Retention Rate</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </section>
      <section className="popular-destinations pb-4 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="fw-bold">Popular Destinations</h2>
              <p className="text-muted">
                Explore our handpicked destinations loved by travelers worldwide
              </p>
            </Col>
          </Row>

          {/* Destination Cards */}
          <Row className="g-4">
            <Col lg={3} md={6} sm={12}>
              <div className="destination-card">
                <img
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
                  alt="Paris"
                />
                <div className="destination-overlay">
                  <h5>Paris</h5>
                  <p>Starting From $899</p>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <div className="destination-card">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                  alt="Maldives"
                />
                <div className="destination-overlay">
                  <h5>Maldives</h5>
                  <p>Starting From $899</p>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <div className="destination-card">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
                  alt="Dubai"
                />
                <div className="destination-overlay">
                  <h5>Dubai</h5>
                  <p>Starting From $1099</p>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <div className="destination-card">
                <img
                  src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&aut…"
                  alt="Switzerland"
                />
                <div className="destination-overlay">
                  <h5>Switzerland</h5>
                  <p>Starting From $1299</p>
                </div>
              </div>
            </Col>
            <Col className="text-center mb-4">
              <Link to="/destinations" className="btn btn-book">
                Book Your Dream Trip <i className="bi bi-arrow-up-right"></i>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
