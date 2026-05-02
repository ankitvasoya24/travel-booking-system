import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Team from "../image/team-travel.jpg";
import { FaPlane, FaHotel, FaUsers, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <div className="py-5 bg-light">
      <Container>
        {/* Story Section */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <span className="text-primary fw-semibold">About Us</span>
            <h1 className="fw-bold mb-3">
              Making Travel{" "}
              <span className="text-primary">Simple & Memorable</span>
            </h1>
            <div
              className="mb-3"
              style={{ width: "70px", height: "4px", background: "#0d6efd" }}
            ></div>

            <p className="lead text-muted">
              At GoTur Travel, we believe traveling should be seamless,
              affordable and unforgettable.
            </p>

            <p className="text-muted">
              Founded in 2015, we have helped thousands of travelers explore the
              world with comfort and confidence. From flights to holiday
              packages, we manage everything so you can focus only on enjoying
              the journey.
            </p>
          </Col>

          <Col lg={6}>
            <Image
              src={Team}
              fluid
              className="rounded-3 shadow-lg"
              alt="Our Team"
            />
          </Col>
        </Row>

        {/* Why Choose Us */}
        <Row className="text-center mb-0">
          <Col xs={12}>
            <h2 className="fw-bold mb-2 mt-1">Why Choose GoTur Travel?</h2>
            <p className="text-muted mb-5">
              We deliver world-class travel experiences with comfort, trust and
              affordability.
            </p>
          </Col>

          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="h-100 border-0 shadow-sm about-card">
              <Card.Body>
                <FaPlane size={42} className="mb-3 text-primary" />
                <h5>Easy Bookings</h5>
                <p className="text-muted">
                  Book flights, hotels & packages in just few simple steps.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="h-100 border-0 shadow-sm about-card">
              <Card.Body>
                <FaHotel size={42} className="mb-3 text-primary" />
                <h5>Premium Hotels</h5>
                <p className="text-muted">
                  Handpicked hotels with luxury comfort and best deals.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="h-100 border-0 shadow-sm about-card">
              <Card.Body>
                <FaUsers size={42} className="mb-3 text-primary" />
                <h5>Expert Team</h5>
                <p className="text-muted">
                  Experienced travel professionals available 24/7.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="h-100 border-0 shadow-sm about-card">
              <Card.Body>
                <FaGlobe size={42} className="mb-3 text-primary" />
                <h5>Worldwide Tours</h5>
                <p className="text-muted">
                  Explore domestic & international destinations worldwide.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

      <style>{`
        .about-card {
          transition: all 0.3s ease;
          border-radius: 16px;
        }

        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </div>
  );
};

export default About;
