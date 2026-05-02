import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../image/image.png";
import "./component.css";

const MainFooter = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row className="gy-4 text-center text-md-start">
          {/* Logo & About */}
          <Col lg={4}>
            <img
              src={logo}
              height="32"
              alt="Gotur Logo"
              className="mb-3 footer-logo"
            />

            <p
              className="text-secondary small mx-auto mx-md-0"
              style={{ maxWidth: "360px" }}
            >
              Making travel accessible and unforgettable for everyone. Join us
              on a journey to the most beautiful places on Earth.
            </p>

            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a href="https://www.facebook.com" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" className="social-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.linkedin.com" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={4} lg={2} className="offset-lg-1">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <Nav className="flex-column small gap-2 align-items-center align-items-md-start">
              <Nav.Link as={Link} to="/" className="p-0 footer-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/destinations" className="p-0 footer-link">
                Destinations
              </Nav.Link>
              <Nav.Link as={Link} to="/packages" className="p-0 footer-link">
                Packages
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="p-0 footer-link">
                About Us
              </Nav.Link>
            </Nav>
          </Col>

          {/* Support */}
          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">Support</h6>
            <Nav className="flex-column small gap-2 align-items-center align-items-md-start">
              <Nav.Link className="p-0 footer-link">Help Center</Nav.Link>
              <Nav.Link className="p-0 footer-link">FAQs</Nav.Link>
              <Nav.Link className="p-0 footer-link">Privacy Policy</Nav.Link>
              <Nav.Link className="p-0 footer-link">Terms of Use</Nav.Link>
            </Nav>
          </Col>

          {/* Contact */}
          <Col md={4} lg={3}>
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <div className="small text-secondary mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              601 Lexington Ave, 15th Floor, New York, NY 10022, USA
            </div>
            <div className="small text-secondary mb-2">
              <i className="bi bi-telephone-fill me-2"></i>
              +1 (212) 555-7845
            </div>
            <div className="small text-secondary">
              <i className="bi bi-envelope-fill me-2"></i>
              support@gotur.com
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <div className="text-center small text-secondary">
          © 2025 Gotur Travel. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default MainFooter;
